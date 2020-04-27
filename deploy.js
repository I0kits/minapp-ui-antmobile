const path = require("path");
const globby = require("globby");
const OssCli = require("ali-oss");
const format = require("date-format");

const bucket = "minapp-web-sites";

const cli = new OssCli({
  bucket,
  region: "oss-cn-zhangjiakou",
  accessKeyId: process.env.ACCESS_KEY_ID,
  accessKeySecret: process.env.ACCESS_KEY_SECRET
});

const uploadFiles = async (dir) => {
  const cwd = path.posix.join(__dirname, "/dist");

  globby.sync(`**/*`, { cwd }).forEach(async (file) => {
    const path = `${dir}/${file}`;
    //console.log("Putting %s to [%s]", `${cwd}/${file}`, `${bucket}/${path}`);
    await cli.put(path, `${cwd}/${file}`);
    //console.log("Updating %s symlink to: [%s]", file, path);
    await cli.putSymlink(file, path);
  });
};

const deploy = async () => {
  const baseName = format.asString("yyyyMMddhhmmss", new Date());
  console.log("Prepare to upload files to [%s/%s]", bucket, baseName);
  await uploadFiles(baseName);
  console.log("All files uploaded, Start update sym links...");
};

cli.getBucketWebsite(bucket).then(deploy).catch(console.error);
