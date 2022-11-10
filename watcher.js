import {exec, spawn} from 'node:child_process';

const [node, _, file] = process.argv;

const getExtension = (file) => {
    const [_, extension] = file.split('.');
    return extension;
};


const spawnNode = (arg) => {
    const result = []
    const pr = spawn(node, [file, ...arg]);
    pr.stdout.on('data', data => {
        let tmp = data.toString().split('\n');
        tmp.forEach((item) => {
            if (item && item !== '') {
                result.push(item);
            }
        });
        console.log(result)
    });

    pr.on('close', code => {
        if(code>0){
            console.log(`child process exited with code ${code}`);
        }
    });
    return pr;
}

spawnNode([1,2])