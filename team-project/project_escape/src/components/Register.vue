<template>
    <div class="col-md-12">
        <div class="card card-container">
                        <h1 id="title">Create Account</h1>
            <Form @submit="handleRegister" :validation-schema="schema">
                <div v-if="!successful">
                        <div class="form-group">
                        <label for="laboratory">연구실</label>
                        <Field name="laboratory" type="text" class="form-control"/>
                        <ErrorMessage name="laboratory" class="error-feedback"/>
                    </div>
                    <div class="form-group">
                        <label for="username">이름</label>
                        <Field name="username" type="text" class="form-control"/>
                        <ErrorMessage name="username" class="error-feedback"/>
                    </div>
                    <div class="form-group">
                        <label for="email">이메일</label>
                        <Field name="email" type="email" class="form-control"/>
                        <ErrorMessage name="email" class="error-feedback"/>
                    </div>
                    <div class="form-group">
                        <label for="password">비밀번호</label>
                        <Field name="password" type="password" class="form-control"/>
                        <ErrorMessage name="password" class="error-feedback"/>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block" :disabled="loading">
                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                            회원가입
                        </button>
                    </div>
                </div>
            </Form>
            <div
                v-if="message"
                class="alert"
                :class="successful ? 'alert-success' : 'alert-danger'">
                {{ message }}
            </div>
        </div>
    </div>
</template>
<script>
    import {Form, Field, ErrorMessage} from "vee-validate";
    import * as yup from "yup";
    export default {
        name: "Register",
        components: {
            Form,
            Field,
            ErrorMessage
        },
        data() {
            const schema = yup
                .object()
                .shape({
                    laboratory: yup
                        .string()
                        .required("연구실을 선택하세요!"),

                    username: yup
                        .string()
                        .required("이름을 입력하시오")
                        .min(2, "2글자 이상을 쓰세요!")
                        .max(20, "Must be maximum 20 characters!"),
                    email: yup
                        .string()
                        .required("이메일을 입력하시오")
                        .email("유효한 이메일이 아닙니다.")
                        .max(50, "Must be maximum 50 characters!"),
                    password: yup
                        .string()
                        .required("원하는 비밀번호를 입력하세요")
                        .min(8, "8자 이상 16자 미만의 비밀번호를 입력하세요.")
                        .max(16, "8자 이상 16자 미만의 비밀번호를 입력하세요.")
                });
            return {successful: false, loading: false, message: "", schema};
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        mounted() {
            if (this.loggedIn) {
                this
                    .$router
                    .push("/profile");
            }
        },
        methods: {
            handleRegister(user) {
                this.message = "";
                this.successful = false;
                this.loading = true;
                this
                    .$store
                    .dispatch("auth/register", user)
                    .then((data) => {
                        this.message = data.message;
                        this.successful = true;
                        this.loading = false;
                    }, (error) => {
                        this.message = (
                            error.response && error.response.data && error.response.data.message
                        ) || error.message || error.toString();
                        this.successful = false;
                        this.loading = false;
                    });
            }
        }
    };
</script>
<style scoped>
</style>