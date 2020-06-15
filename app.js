var express                   = require("express"),
    app                       = express(),
    axios                     = require("axios");
    const resizeOptimizeImages = require('resize-optimize-images');
    const fs = require('fs')  
    const Path = require('path')  
    const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
    const ffprobePath = require('@ffprobe-installer/ffprobe').path;
    const ffmpeg = require('fluent-ffmpeg');
    const server=app.listen(process.env.PORT || 3000,function(){
        console.log("Yeah I am connected");
     });
   
    var proc = new ffmpeg();
    ffmpeg.setFfmpegPath(ffmpegPath);
    ffmpeg.setFfprobePath(ffprobePath);

    
    app.get("/",function(req,response){
        function getJson(){
            axios({
                method:'get',
                url:'http://www.json-generator.com/api/json/get/cpCTgMjZNK?indent=2'
            })
            
            .then(res=>{
                /* ============================================================
                Function: Download Image
                ============================================================ */

                const download_image = (url, image_path) =>
                axios({
                url,
                responseType: 'stream',
                }).then(
                response =>
                new Promise((resolve, reject) => {
                response.data
                .pipe(fs.createWriteStream(image_path))
                .on('finish', () => resolve())
                .on('error', e => reject(e));
                }),
                );
                
                /* ============================================================
                Download Images in Order
                ============================================================ */

                (async () => {
                let example_image_1 = await download_image(res.data.employees[1].background, 'img001.png');

                // // console.log(example_image_1.status); // true
                // // console.log(example_image_1.error); // ''
                                    
                let example_image_2 = await download_image(res.data.employees[0].background, 'img002.png');
                                    
                // // console.log(example_image_2.status); // false
                // // console.log(example_image_2.error); // 'Error: Request failed with status code 404'
                
                let example_image_3 = await download_image(res.data.employees[2].background, 'img003.png');
                
                // console.log(example_image_3.status); // true
                // console.log(example_image_3.error); // ''
                 (() => {
                    // Set the options.
                    const options = {
                    images: ['./img001.png','./img002.png','./img003.png'],
                    width: 1920,
                    quality: 90
                    };
                                            
                    // Run the module.
                     resizeOptimizeImages(options);
                     setTimeout(f, 4000);
                      function f(){
                    let command = ffmpeg("./img%03d.png")
                    // let command = ffmpeg(images[1].path)
                    command
                    .inputFPS(1)
                    .outputFPS(30)
                    .videoCodec('libx264')
                    .videoBitrate(1024)
                    .size('640x?')
                    .loop(3.5)
                    .addInput('./audio.mp3')
                    .save("slidevideo.mp4")
                   
                      }
                    })();
                   
                    })();
                 }
                );
        }
        getJson();
        response.send("Your Video will be created within 4 seconds. Check the root directory.");
    })
    
    