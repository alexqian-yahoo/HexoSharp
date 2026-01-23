import childProcess from 'child_process';
// 设置环境变量
process.env.CLOUDFLARE_API_TOKEN = process.env.CF_API_TOKEN;
process.env.CLOUDFLARE_ACCOUNT_ID = process.env.CF_ACCOUNT_ID;

// 或者通过参数传递
try {
  const command = `npx wrangler kv:namespace list --api-token ${process.env.CF_API_TOKEN} --account-id ${process.env.CF_ACCOUNT_ID}`;
  console.log('Running command:', command);
  
  const result = execSync(command, {
    encoding: 'utf-8',
    stdio: 'pipe',
    env: {
      ...process.env,
      CLOUDFLARE_API_TOKEN: process.env.CF_API_TOKEN,
      CLOUDFLARE_ACCOUNT_ID: process.env.CF_ACCOUNT_ID
    }
  });
  console.log('Success:', result);
} catch (error) {
  console.error('Error:', error.message);
  console.error('Stderr:', error.stderr?.toString());
  process.exit(1);
}

//old code if update sucess could be delete
//const res = childProcess.execSync('wrangler kv:namespace list');
//const ary = JSON.parse(res.toString());
//const target = ary.find((item) => item.title === '__hexo-sharp-workers_sites_assets');
//let count = 0;
//if (target) {
//  const res2 = childProcess.exec(`wrangler kv:namespace delete --namespace-id=${target.id}`);
//  res2.stdout.on('data', (chunk) => {
//    const msg = chunk.toString();
//    if (msg.startsWith('Are you sure you want')) {
//      res2.stdin.write('y\n');
//    }
//    console.log(`${count}: ${chunk.toString()}`);
//    count += 1;
//  });
//  res2.on('close', () => {
//    console.log('KV cleaned.');
//  });
//} else {
//  console.log('KV is empty.');
//}
