<template>

<!-- <div class="app">
    <div v-if="state.account.id">
      <p>안녕하세요? {{ state.account.name }}님!</p>
      <button @click="logout()">로그아웃</button>
    </div>
    <div v-else>
      <label for="loginId">
        <span>아이디</span>
        <input type="text" id="loginId" v-model="state.form.loginId" />
      </label>
      <label for="loginPw">
        <span>패스워드</span>
        <input type="password" id="loginPw" v-model="state.form.loginPw" />
      </label>
      <hr />
      <button @click="submit()">로그인</button>
    </div>
  </div> -->
    <div class="col-md-12">
            <img id="profile-img" src="../assets/백경씨수정본.png" >
            <Form @submit="handleLogin" :validation-schema="schema">
                <div v-if="state.account.id">
                    <p>안녕하세요? {{ state.account.lab }}교수님 랩실, {{ state.account.name }}학생님!</p>
                    <button @click="logout()">로그아웃</button>
                    
                </div>
                <div v-else>
                <div class="form-group">
                    <label for="loginId">Email</label>
                    <input id="loginId" name="email" v-model="state.form.loginId" type="text" class="form-control" />
                    <ErrorMessage name="loginId" class="error-feedback"/>
                </div>
                <div class="form-group">
                    <label for="loginPw">Password</label>
                    <input id="loginPw" name="loginPw" type="password" v-model="state.form.loginPw" class="form-control"/>
                    <ErrorMessage name="loginPw" class="error-feedback"/>
                </div>
                <div class="form-group">
                    <button @click="submit()" class="btn btn-primary btn-block" :disabled="loading">
                        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                        <span>로그인</span>
                    </button>
                </div>
                <div class="form-group">
                    <div v-if="message" class="alert alert-danger" role="alert">
                        {{ message }}
                    </div>
                </div>
                </div>
            </Form>
        </div>

</template>
<script>
import axios from "axios";
import { reactive } from "vue";
export default {
    setup() {
        const state = reactive({
            account:{
                id: null,
                name:"",
                lab:"",
            },
            form: {
                loginId: "",
                loginPw: "",
            },
        });

        const submit = () =>{
            const args={
                loginId: state.form.loginId,
                loginPw: state.form.loginPw,
            };
            
            axios
                .post("/api/account", args)
                .then((res)=>{
                    alert("로그인에 성공했습니다.");
                    state.account = res.data;
                })
                .catch(()=>{
                    alert("로그인에 실패하였습니다. 계정 정보를 확인해주세요.");

                });
        };

        const logout = ()=>{
            axios.delete("/api/account").then(() =>{
                alert("로그아웃하였습니다.");
                state.account.id= null;
                state.account.name = "";
        });
        };  
            
        axios.get("/api/account").then((res) =>{
            state.account =res.data;
        });

        return { state, submit, logout  };
    },
};
</script>
<style scoped>
#profile-img{
    width: 30rem;
}
</style>