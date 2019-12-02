export default function( {store, redirect }) {
  if(store.state.users.me) {
    //me가 존재하면 로그인 아니면 로그인 전 상태
    redirect('/');
  }


}