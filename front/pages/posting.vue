<template>
  <v-row
    justify="center"
    class="ma-0 pa-0 fill-height"
  >
    <v-card
      color="white"
      justify="center fill-height"  
    >
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
          <section class="container">
            <div class="d-flex flex-row text-center">
              <PostOptionModal style="width: 100%;" @receive="onChangeCategory" name="Category" :Items="categoryItems" />
              <PostOptionModal style="width: 100%;" @receive="onChangeLocation" name="Location" :Items="LocationItems" />
            </div>
            <!-- v-text-field에서 hiede-details옵션을 false로 안하면 밑에 여백 공간이 생긴다. -->
            <v-text-field 
              class="ma-0 pa-0"
              outlined
              :hide-details=true
              v-model="title"
              label="Title"
            />
            <div class="quill-editor"
              :content="content"
              @change="onEditorChange($event)"
              v-quill:myQuillEditor="editorOption">
            </div>
          <input id="getFile" type="file" hidden multiple @change="onChangeImages" />
          <v-row class="ma-0 pa-0 mt-2 mb-2" justify="end">
            <v-divider></v-divider>
            <v-btn class="mx-auto" color="green" outlined width="50%">돌아가기</v-btn>
            <v-btn class="mx-auto" type="submit" color="primary" outlined width="50%">작성하기</v-btn>
          </v-row>
        </section>    
      </v-form>
    </v-card>
  </v-row>
</template>
 
<script>
  import hljs from 'highlightjs'
  import PostOptionModal from '~/components/PostOptionModal'
  import { mapState } from 'vuex';
  
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
        content: '<p>Initial Content</p>',
        title: '',
        hideDetails: true,
        valid: false,
        location :'',
        category: '',
        categoryItems: [ '어학', '취업', '고시', '자격증', '프로그래밍', '기타' ],
        LocationItems: [ '서울', '수원', '인천', '부산', '강원', '천안', '울산', '광주', '제주', '기타' ],
        serverUrl: 'http://localhost:4000',
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
                    this.myQuillEditor.format('image', false);
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
      lastId() {
        return this.$store.state.posts.lastId;
      }
    },
    created() {
      console.log(this.lastId);
    },
    methods: {
      onEditorChange({ editor, html, text }) {
        console.log('editor change!', editor, html, text)
        this.content = html
      },
      onChangeLocation(data){
        this.location = data;
        console.log(`this.location: ${this.location}`);
      },
      onChangeCategory(data){
        this.category = data;
        console.log(`this.category: ${this.category}`);
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
            this.$store.commit('posts/concatImagePaths', files.data);
            const range = this.myQuillEditor.getSelection();
            console.log(`rangeLength: ${range.length}  rangeIndex: ${range.index}`);
            if(files.data.length === 1) {
              //이미지가 1개라면
              console.log(`이미지 패스 갯수 ${files.data.length}`);
              this.myQuillEditor.insertEmbed(range.index, 'image', `${this.serverUrl}/${files.data[0]}`);
            }
            else{
              // 이미지가 1개 이상이면
              console.log(`이미지 패스 갯수 ${files.data.length}`);
              for (const img of files.data){
                console.log(img);
                this.myQuillEditor.insertEmbed(range.index, 'image', `${this.serverUrl}/${img}`);
              }
            };
          })
          .catch((err)=>{
            console.error(err);
          });
      },
      onSubmitForm() {
        if(this.$refs.form.validate()){
          this.$store.dispatch('posts/add', {
            title: this.title,
            content: this.content,
            location: this.location,
            category: this.category,
          })
          .then((res)=>{
            this.content = '';
            this.$store.commit('posts/concatImagePaths', null);
            // this.$router.push({ path: `/post/${this.lastId}`});
          })
          .catch((err)=>{
            console.error(err);
          });
        }
      }
    },
    components: {
      PostOptionModal,
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