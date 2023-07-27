function recursiveFunction(input) {
    return new Promise((resolve, reject) => {
        if (input.length === 0) {
            // 종료 조건: input이 더 이상 없을 때
            resolve([]);
            return;
        }

        const currentItem = input.shift();

        // 비동기 작업 수행 (예: API 호출, 파일 읽기 등)
        asyncOperation(currentItem, (result) => {
            recursiveFunction(input)
                .then((results) => {
                    results.push(result);
                    resolve(results);
                })
                .catch(reject);
        });
    });
}

// 예제 실행
const inputArray = [1, 2, 3, 4, 5];

recursiveFunction(inputArray)
    .then((finalResults) => {
        console.log('Final results:', finalResults);
    })
    .catch((error) => {
        console.error('Error:', error);
    });


function projectFileList(rootPath, callback) {
    fs.readdir(rootPath, (err, files) => {
        if (err) {console.log(err);return;
        }
        const promises = files.map((elem) => {
            return new Promise((resolve, reject) => {
                const filePath = path.join(rootPath, elem);
                fs.stat(filePath, (err, stat) => {
                    if (err) {
                        console.log(err);reject(err);return;
                    }
                    if (stat.size === 0) {
                        projectFileList(filePath, resolve);
                    } else {
                        resolve({ file: elem, path: rootPath });
                    }
                });
            });
        });
        Promise.all(promises)
            .then((results) => {
                const fileList = results.flat();callback(fileList);})
            .catch((error) => {console.error(error);});
    });
}




function projectFileList(rootPath, _callback_) {
    const Test = [];
    fs.readdirSync(rootPath, (err, files) => {
        if (err) { console.log(err); return; }

        files.forEach(elem => {
            fs.statSync(path.join(rootPath, elem), (err, state) => {
                if (err) { console.log(err); return; }

                if (state.size === 0) {
                    projectFileList(path.join(rootPath, elem), _callback_);
                } else {
                    Test.push(_callback_({file: elem, path: rootPath}));
                }
            })
        })
        return Test;
    });
}