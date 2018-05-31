const UserData = require('../../models/UserData');
const Canvas = require('canvas');
const fs = require('fs');
const pdf = require('html-pdf');

class Users {
    constructor() {
        this.database = null;
        this.data = this.data.bind(this);  // 改变data函数中的this指向
        this.detail = this.detail.bind(this);
        this.Config = this.Config.bind(this);
        this.more = this.more.bind(this);
    }
    async users(req, res, next) {
        try {
            const doc = await UserData.find();
            if (doc) {
                res.render('users', { data: doc });
            }
        } catch (e) {
            console.log('err:' ,e);
        }

    }

    async data(req, res, next) {
        let id = req.params.id;
        try {
            const doc = await UserData.findById(id);
            if (doc) {
                this.database = doc;
                res.render('data', {
                    data: doc,
                });
            }
        } catch (e) {
            console.log('error:',e);
        }
    }

    async detail(req, res, next) {
        let index = req.params.index;
        res.render('detail', {
            data: this.database,
            index: index,
        })
    }

    async more(req, res, next) {
        let i = req.params.i;
        let index = req.params.index;
        res.render('more', {
            data: this.database,
            index: index,
            i: i,
        })
    }

    async Config(req, res, next) {
        let index = req.params.index;
        res.render('ConfigPreset', {
            data: this.database,
            index: index,
        });
    }

    async pdf(req, res, next) {
        let url = null;
        const canvas = new Canvas(500, 300);
        const ctx = canvas.getContext('2d');

        let dataY = [2,1.5,1,0.5,0];
        let dataX = [1,2,3,4,5,6,7,8,9,10,11,12];
        let data = [0.5,1.2,1.8,1.2,0.8,0.4,1.2,0.9,1.5,0.7,0.4,1.7];
        const width = canvas.width = 500;    // canvas 宽度
        const barWidth = (width - 40) / 11;    // X轴每格宽度
        const height = canvas.height = 200;    // canvas 高度
        const paddingWidth = 20;    // canvas padding 宽度

        let highX = Math.ceil(Math.max.apply(null,data));

        // 画框架
        ctx.beginPath();
        ctx.strokeRect(20,20,width - 40,160);

        // 画Y轴
        function drawY(){
            for (let i=1;i<4;i++) {
                ctx.moveTo(15, i * 40 + 20);
                ctx.lineTo(width - 20, i * 40 + 20);
                ctx.stroke();
            }
            for (let i=0;i<5;i++) {
                ctx.fillText(dataY[i], 0, i * 40 + 24)
            }
            drawX();
        }
        drawY();

        function drawX() {
            for (let i=0;i<12;i++) {
                ctx.moveTo((i * barWidth)+ 20, 180);
                ctx.lineTo((i * barWidth) + 20, 185);
                ctx.stroke();
                ctx.fillText(dataX[i], (i * barWidth) + 17, 195);
            }
            ctx.closePath();
            drawData();
        }

        function drawData() {
            ctx.beginPath();
            ctx.moveTo(paddingWidth, height - paddingWidth - ((height - paddingWidth - paddingWidth) / highX) * data[0]);
            for(let i=0;i<11;i++){
                let nextY = height - paddingWidth - ((height - paddingWidth - paddingWidth) / highX) * data[i + 1];
                ctx.lineTo((i + 1) * barWidth + 20, nextY);
            }
            ctx.lineTo(width - paddingWidth, height - paddingWidth);
            ctx.lineTo(paddingWidth, height - paddingWidth);
            ctx.closePath();
            ctx.stroke();
            ctx.fillStyle = '#ff8000';
            ctx.fill();
            url = canvas.toDataURL();
        }
        const html =
            `<html>
                <head>
                    <style>
                        .center{ text-align: center }
                    </style>
                </head>
                <body>
               
                    <header>
                        <h3 class="center">ROMMELL TOMINES (DOB: 07/16/1962)</h3>
                        <p class="center">Account #: M4677</p>
                        <p class="center">Dr. SOBOL</p>
                        <p class="center">City: LOA ANGELES</p>
                    </header>
                    <arctical>                      
                        <img src=${ url } id="img" />
                    </arctical>
                    <img src=""/>
                    <script>
                       
                    </script>
                </body>
            </html>`;
        pdf.create(html).toFile('out.pdf', (err, response) => {
            console.log(response)
        });
        res.render('pdf', {
            title: 'this is pdf',
            data: html
        });
    }

    async SendPDF(req, res, next) {
        const url = 'http://localhost:3000/users/pdf';
        const html = `<html><body><img src=""/><h1>this is padf</h1></body></html>`;
        pdf.create(html).toFile('out.pdf', (err, response) => {
            console.log(response)
        });
        res.send({data: html});
        res.end();
    }
}

module.exports = new Users();