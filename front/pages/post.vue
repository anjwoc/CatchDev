<template>
  <v-app>
      <v-form>
        
        <section class="container">
          
          <v-text-field 
            outlined
          />
          <div class="quill-editor" 
            :content="content"
            @change="onEditorChange($event)"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
            v-quill:myQuillEditor="editorOption">
          </div>
          <input id="getFile" type="file" hidden multiple @change="onChangeImages" />
      </section>
    </v-form>
  </v-app>
  
</template>
 
<script>
  import hljs from 'highlightjs'
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'font': [] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['clean'],
    ['link', 'image', 'video'],
  ]
  export default {
    data () {
      return {
        content: '<p>I am Example</p>',
        quillUpdateImg: false,
        serverUrl: '',
        editorOption: {
          theme: 'snow',
          // some quill options
          modules: {
            toolbar: {
              container: toolbarOptions, //toolbar
              handlers: {
                'image': function(value){
                  if(value){
                    document.getElementById('getFile').click();
                  }else {
                    this.quill.format('image', false);
                  }
                },
                'video': function(value){
                  if(value){
                    
                  }
                }
              }
            },
            
            syntax: {
              highlight: text => hljs.highlightAuto(text).value
            }
          },
        }
      }
    },
    mounted() {
      console.log('app init, my quill insrance object is:', this.myQuillEditor)
      setTimeout(() => {
        this.content = 'i am changed'
      }, 3000)
    },
    methods: {
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      onEditorChange({ editor, html, text }) {
        console.log('editor change!', editor, html, text)
        this.content = html
      },
      onChangeImages(e){
        console.log(e.target.files, e.target.files.forEach);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
          imageFormData.append('image', f);
        });
        this.$store.dispatch('posts/uploadImages', imageFormData)
          .then(()=>{
            console.log("진입");
            const range = this.myQuillEditor.getSelection();
            console.log(`range: ${range}`);
            this.myQuillEditor.insertEmbed(range.index, 'image', 'https://imgur.com/HesPs6K');
          })
          .catch(()=>{
          });
      }
    }
  }
</script>
 
<style lang="scss" scoped>
  .container {
    width: 80%;
    margin: 0 auto;
    padding: 50px 0;
    .quill-editor {
      min-height: 200px;
      max-height: 800px;
      overflow-y: auto;
    }
  }
</style>