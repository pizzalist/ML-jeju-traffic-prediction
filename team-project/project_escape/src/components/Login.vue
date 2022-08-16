<template>
    <div class="col-md-12">
            <img id="profile-img" src="../assets/백경씨수정본.png" >
            <Form @submit="handleLogin" :validation-schema="schema">
                <div class="form-group">
                    <label for="email">Email</label>
                    <Field name="email" type="text" class="form-control"/>
                    <ErrorMessage name="email" class="error-feedback"/>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <Field name="password" type="password" class="form-control"/>
                    <ErrorMessage name="password" class="error-feedback"/>
                </div>
                <div class="form-group">
                    <button @onclick="submit()" class="btn btn-primary btn-block" :disabled="loading">
                        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                        <span>로그인</span>
                    </button>
                </div>
                <div class="form-group">
                    <div v-if="message" class="alert alert-danger" role="alert">
                        {{ message }}
                    </div>
                </div>
            </Form>
        </div>
</template>
<script>
    import axios from "axios";
    import { reactive } from "vue";
    import {Form, Field, ErrorMessage} from "vee-validate";
    import * as yup from "yup";
    export default {
        name: "Login",
        components: {
            Form,
            Field,
            ErrorMessage
        },
        data() {
            const schema = yup
                .object()
                .shape({
                    email: yup
                        .string()
                        .required("이메일을 입력하세요!"),
                    password: yup
                        .string()
                        .required("비밀번호를 입력하세요!")
                        .min(8, "8자 이상 16자 미만의 비밀번호를 입력하세요.")
                        .max(16, "8자 이상 16자 미만의 비밀번호를 입력하세요.")
                });
            return {loading: false, message: "", schema};
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        created() {
            if (this.loggedIn) {
                this
                    .$router
                    .push("/profile");
            }
        },
        methods: {
            handleLogin(user) {
                this.loading = true;
                this
                    .$store 
                    .dispatch("auth/login", user)
                    .then(() => {
                        this
                            .$router
                            .push("/profile");
                    }, (error) => {
                        this.loading = false;
                        this.message = (
                            error.response && error.response.data && error.response.data.message
                        ) || error.message || error.toString();
                    });
            }
        },

        setup() {
        const state = reactive({
            account:{
                id: null,
                name:"",
                lab:"",
            },
            form: {
                email: "",
                password: "",
            },
        });
        const submit = () =>{
            const args={
                email: state.form.email,
                password: state.form.password,
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