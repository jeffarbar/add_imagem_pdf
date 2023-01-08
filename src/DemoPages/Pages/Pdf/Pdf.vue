<template>
  <div style="margin: auto;width: 80%;">
    <page-title :heading=heading :subheading=subheading :icon=icon></page-title>
      <vue-instant-loading-spinner ref="Spinner" color="#660099">
        Gerando PDF
      </vue-instant-loading-spinner>
    <div class="content">
      <div class="main-card mb-3 card">
        <div class="card-body">
          <form @submit.prevent="converte" class="">
              <div class="form-row">
                <div class="col-md-4">
                  <div class="position-relative form-group">
                    <label for="pdf" class="">Arquivo Pdf&nbsp;</label>
                    <input class="button_img" name="pdf" id="pdf" required type="file" accept="application/pdf" @change="onFilePdfChange" />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="position-relative form-group">
                    <label for="png" class="">Arquivo Png&nbsp;</label>
                    <input class="button_img" name="png" id="png" required type="file" accept="image/*"  @change="onFilePngChange" />
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-4">
                  <div class="position-relative form-group">
                  <label for="posicao" class="">Posição da Imagem</label>
                  <select name="select" id="posicao" v-model="pdfPosicao" required class="form-control">
                      <option v-for="(item, index) in posicoes" 
                        :value="item" 
                        :key="index">
                          {{item}}
                      </option>
                  </select>  
                </div>
                </div>
              </div>

              <div class="form-row">
                <div class="col-md-12">
                  <p align="right">
                    <button class="mt-2 btn btn-vivo">Incluir</button>
                  </p>
                </div>
              </div>
              <div class="form-row">
                  <div class="col-md-12">
                      <p align="center">
                        <a v-if="base64Pdf" v-bind:href="base64Pdf" download="pdf_imgem.pdf">
                          Download Pdf
                        </a>
                      </p>
                  </div>
              </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import PageTitle from "../../../Layout/Components/PageTitle.vue";

  import VueInstantLoadingSpinner from 'vue-instant-loading-spinner'

  const { PDFDocument } = require('pdf-lib');

  import { Buffer } from 'buffer';

  export default {
    name:'PdfDemonstracao',
    components: {
      PageTitle,
      VueInstantLoadingSpinner,
    },
    data: () => ({
      heading: 'Pdf',
      subheading: 'Incluir imagem em pdf.',
      icon: 'pe-7s-graph text-success',
      posicoes: ["ESQUERDA","CENTRO","DIREITA"],

      pdfPosicao: null,

      url_pdf: null,
      foto_pdf: null,

      url_img: null,
      foto_img: null,

      LARGURA_IMAGEM: 200,
      ALTURA_IMAGEM: 200,
      
      positionY: 0,
      positionX: 0,

      base64Pdf: null,

    }),
    mounted() {

    },
    methods: {

      async converte(){
        
        try {

          this.$refs.Spinner.show();

          console.log('PDF'); 

          const pdfOriginalBytes = await fetch(this.url_pdf).then(res => res.arrayBuffer())

          const pdfDoc = await PDFDocument.load(pdfOriginalBytes);

          const imgOriginalBytes = await fetch(this.url_img).then(res => res.arrayBuffer())

          let img = null;
          if(  this.foto_img.type == 'image/png' ){
              img = await pdfDoc.embedPng(imgOriginalBytes);
          }else{
              img = await pdfDoc.embedJpg(imgOriginalBytes);
          }

          pdfDoc.getPages().forEach(element => {

              if( this.pdfPosicao == 'DIREITA' ){
                  this.positionX = element.getWidth() - ( this.LARGURA_IMAGEM + 2 );
              }else if( this.pdfPosicao == 'CENTRO' ){
                  this.positionX = (element.getWidth() - this.LARGURA_IMAGEM) / 2;
              }else{
                  this.positionX = 0;
              }

              element.drawImage(img, {
                  x: this.positionX,
                  y: this.positionY,
                  width: this.LARGURA_IMAGEM,
                  height: this.ALTURA_IMAGEM
              });
            });

            const pdfBytes = await pdfDoc.save();

            this.base64Pdf = 'data:application/octet-stream;base64,' + Buffer.from(pdfBytes).toString('base64');
            this.limpaProcessa()
          } catch (error) {
            this.limpaProcessa()
            console.error(error);
          }

      },
      limpaProcessa(){

        this.pdfPosicao = null;
        this.url_pdf = null;
        this.foto_pdf = null;
        this.url_img = null;
        this.foto_img = null;
        this.$refs.Spinner.hide();
      },
      onFilePdfChange(e) {
        this.foto_pdf = e.target.files[0];
        this.url_pdf = URL.createObjectURL(this.foto_pdf);
      },
      onFilePngChange(e) {
        this.foto_img = e.target.files[0];
        this.url_img = URL.createObjectURL(this.foto_img);
      }
    }
  }
</script>
