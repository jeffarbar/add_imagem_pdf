var express = require("express");

var app = express();
var cors = require('cors');
var path = require("path");
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const multer = require('multer');
const upload = multer({ dest: 'pdf/' });




//app.use('/doc', swaggerUi.serve);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));



app.get("/", (req, res) => {
    res.json({message:'Requisição realizada com sucesso!'});
});


app.post("/pdf/addImagem", upload.single('pdf'), upload.single('imagem') , (req, res) => {

    console.log(req.body);
    console.log(req.params);

   // const pathToPDF =  path.join(__dirname, "./original.pdf");
   // const pathToImage = path.join(__dirname, "./assinatura.png");
    //const positionImage = req.query.posicaoImagem;

    //console.log(positionImage)

   // const LARGURA_IMAGEM = 200;
   // const ALTURA_IMAGEM = 200;

    //const run = async ({ pathToPDF, pathToImage }) => {
      //  const pdfDoc = await PDFDocument.load(fs.readFileSync(pathToPDF));
      //  const img = await pdfDoc.embedPng(fs.readFileSync(pathToImage));

      /*
      const pdfDoc = PDFDocument.load(fs.readFileSync(pathToPDF));
      const img = pdfDoc.embedPng(fs.readFileSync(pathToImage));

        var positionY = 0;
        var positionX = 0;
        

        pdfDoc.getPages().forEach(element => {

            if( positionImage == 'DIREITA' ){
                positionX = element.getWidth() - ( LARGURA_IMAGEM + 2 );
            }else if( positionImage == 'CENTRO' ){
                positionX = (element.getWidth() - LARGURA_IMAGEM) / 2;
            }else{
                positionX = 0;
            }

            element.drawImage(img, {
                x: positionX,
                y: positionY,
                width: LARGURA_IMAGEM,
                height: ALTURA_IMAGEM
            });
          });

        //const pdfBytes = await pdfDoc.save();
        const pdfBytes = pdfDoc.save();
        const newFilePath = `${path.basename(pathToPDF, '.pdf')}-result.pdf`;
        fs.writeFileSync(newFilePath, pdfBytes);
   // }

   // run({ pathToPDF, pathToImage }).catch(console.error);
    */
    res.json({message:'Requisição realizada com sucesso!'});

});

/*
app.post("/pdf/addImagem", uploadStorage.single("file"), 
            uploadStorage.single("png"), (req, res) => {

    console.log(req)
    return res.send("Single file")
})  
*/

app.listen(3000 || process.env.PORT, () => {
    console.log("servidor rodando na porta 3000");
});


