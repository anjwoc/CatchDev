<template>
  <v-row
    justify="center"
    class="ma-0 pa-0 fill-height"
  >
    <alert-message @update="updateStatus" :message="msg" :dialog="alertDialog" :type="type" />
    <v-card
      color="white"
      width="100%"
      class="ma-0 pa-0"
      justify="center fill-height"  
    >
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
          <section class="container">
          <div class="d-flex flex-row text-center">
            <PostOptionModal style="width: 100%;" @receive="onChangeCategory" name="Category" :Items="categoryItems" />
            <PostOptionModal style="width: 100%;" @receive="onChangeLocation" name="Location" :Items="locationItems" />
          </div>
          <!-- v-text-field에서 hiede-details옵션을 false로 안하면 밑에 여백 공간이 생긴다. -->
          <v-text-field 
            class="ma-0 pa-0"
            outlined
            :hide-details=true
            v-model="title"
            :rules="titleRules"
            label="Title"
          />
          <div class="quill-editor"
            :content="content"
            @change="onEditorChange($event)"
            @focus="onEditorFocus($event)"
            v-quill:myQuillEditor="editorOption">
          </div>
          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn id="showVideoForm" hidden v-on="on"></v-btn>
            </template>
            <div>
              <v-card>
                <v-card-text>
                  <v-text-field
                    outlined
                    class="mb-0 pb-0"
                    v-model="videoUrl"
                    color="red"
                    :hide-details=true
                    label="Youtube link here..."
                    prepend-inner-icon="mdi-youtube"
                  >
                  </v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="ma-0 pa-0" @click="dialog = false" text color="black">cancel</v-btn>
                  <v-btn class="ma-0 pa-0" @click="insertVideo" text color="black">save</v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </v-dialog>
          <input-tag v-model="hashtags" placeholder="Hashtags here..." ></input-tag>
          <input id="getFile" type="file" hidden multiple @change="onChangeImages" />
          <v-row class="ma-0 pa-0" justify="end">
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
  import hljs from 'highlight.js/lib/highlight.js'
  import PostOptionModal from '~/components/PostOptionModal'
  import AlertMessage from '~/components/AlertMessage'
  import { mapState } from 'vuex';
  
  hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
  hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))

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
        hashtags: [],
        category: '',
        videoUrl: '',
        editorIndex: '',
        msg: '',
        type: 'fail',
        alertDialog: false,
        dialog: false,
        categoryItems: [ '어학', '취업', '고시', '자격증', '프로그래밍', '기타' ],
        locationItems: [ '서울', '수원', '인천', '부산', '강원', '천안', '울산', '광주', '제주', '기타' ],
        titleRules: [
          v => !!v || '게시글 제목은 필수입니다.'
        ],
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
                },
                'video': function(value) {
                  if(value){
                    document.getElementById('showVideoForm').click();
                  }else{
                    this.myQuillEditor.format('video', false);
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
      mainPosts() {
        return this.$store.state.posts.mainPosts;
      }
    },
    methods: {
      insertVideo() {
        const idx = this.editorIndex ? this.editorIndex.index : 'none';
        //youtube 재생 에러때문에 replace
        this.videoUrl = this.videoUrl.replace("watch?v=", "embed/");
        this.myQuillEditor.insertEmbed(idx, 'video', this.videoUrl);
        this.alertDialog = false;
        this.videoUrl = '';
      },
      onEditorChange({ editor, html, text }) {
        this.editorIndex = this.myQuillEditor.getSelection();
        this.content = html
      },
      onEditorFocus(quill) {
        this.editorIndex = this.myQuillEditor.getSelection();
      },
      onChangeLocation(data){
        this.location = data;
      },
      onChangeCategory(data){
        this.category = data;
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
            if(files.data){
              this.$store.commit('posts/concatImagePaths', files.data);
            }
            const range = this.myQuillEditor.getSelection();
            if(files.data.length === 1) {
              //이미지가 1개라면
              this.myQuillEditor.insertEmbed(range.index, 'image', `${this.serverUrl}/${files.data[0]}`);
            }
            else{
              // 이미지가 1개 이상이면
              for (const img of files.data){
                this.myQuillEditor.insertEmbed(range.index, 'image', `${this.serverUrl}/${img}`);
              }
            };
          })
          .catch((err)=>{
            console.error(err);
          });
      },
      updateStatus(data) {
        const status = !data;
        this.alertDialog = status;
      },
      onSubmitForm() {
        if(this.$refs.form.validate()){
          if(this.category === '' || this.location === ''){
            //v-menu나 v-dialog는 rules 옵션이 없어서 직접 적용
            this.alertDialog = true;
            this.msg = '카테고리 혹은 지역은 필수입니다.';
            return;
          }
          this.$store.dispatch('posts/add', {
            title: this.title,
            content: this.content,
            hashtags: this.hashtags,
            location: this.location,
            category: this.category,
          })
          .then((res)=>{
            this.content = '';
            this.$store.commit('posts/concatImagePaths', []);
            const lastId = '';
            this.$router.push({ path: `/post/${res} `});
          })
          .catch((err)=>{
            console.error(err);
          });
        }
      }
    },
    components: {
      PostOptionModal,
      AlertMessage,
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
      min-height: 600px;
      max-height: 650px;
      overflow-y: auto;
    }
  }
  
</style>