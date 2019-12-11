<template>
  <v-row
    justify="center"
    class="ma-0 pa-0 fill-height"
  >
    <v-card
      color="white"
      justify="center fill-height"  
    >
        <v-form>
          <section class="container">
            <v-text-field 
              outlined
              v-model="title"
              label="Title"
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
          <v-row class="ma-0 pa-0 mt-2 mb-2" justify="end">
            <v-divider></v-divider>
            <v-btn class="mx-auto" color="green" outlined width="50%">돌아가기</v-btn>
            <v-btn class="mx-auto" color="primary" outlined width="50%">작성하기</v-btn>
          </v-row>
          
        </section>    
      </v-form>
    </v-card>
    
  </v-row>
  
</template>
 
<script>
  import hljs from 'highlightjs'
  import { mapState} from 'vuex';
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
        title: '',
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
                    console.log("클릭하냐?");
                    document.getElementById('getFile').click();
                  }else {
                    console.log("여기 들어오냐?");
                    this.myQuillEditor.format('image', false);
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
            },
            imageResize: true,
          },
        }
      }
    },
    computed: {
      ...mapState('posts', ['newImagePath'])
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
        this.$axios.post('/board/images', imageFormData , {
          withCredentials: true,
        })
          .then((files)=>{
            console.log(`posts/uploadImages 호출 ${files}`);
            console.log(files.data);
            const range = this.myQuillEditor.getSelection();
            console.log(`rangeLength: ${range.length}  rangeIndex: ${range.index}`);
            console.log(typeof(files.data));
            console.log(`이미지경로 : ${files.data}`)
            if(files.data.length === 1) {
              //이미지가 1개라면
              console.log(`이미지 패스 갯수 ${files.data.length}`);
              this.myQuillEditor.insertEmbed(range.index, 'image', `http://localhost:4000/${files.data[0]}`);
            }
            else{
              // 이미지가 1개 이상이면
              console.log(`이미지 패스 갯수 ${files.data.length}`);
              for (const img of files.data){
                console.log(img);
                this.myQuillEditor.insertEmbed(range.index, 'image', `http://localhost:4000/${img}`);
              }
            };
          })
          .catch((err)=>{
            console.error(err);
          });

        
      }
    },

    middleware: 'authenticated',

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