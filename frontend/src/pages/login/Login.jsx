import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormLabel,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import logo from "../../assets/logo-estoquix.png";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  errorNotification,
  successNotification,
} from "../../services/notification";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Box>
      <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
      <Input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <Alert className="error" status={"error"} mt={2}>
          <AlertIcon />
          {meta.error}
        </Alert>
      ) : null}
    </Box>
  );
};

const LoginForm = () => {
  const [isMember, setIsMember] = useState(false);
  const { setupUser, getCurrentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <Formik
      validateOnMount={true}
      validationSchema={Yup.object({
        documento: Yup.string()
          .required("Documento é um campo obrigatório")
          .min(11, "Documento deve conter no mínimo 11 caracteres")
          .required("Documento é um campo obrigatório"),
        senha: Yup.string()
          .min(6, "Senha deve conter no mínimo 6 caracteres")
          .required("Senha é um campo obrigatório"),
        nome: isMember
          ? Yup.string()
          : Yup.string()
              .min(3, "Nome deve conter no mínimo 3 caracteres")
              .required("Nome é um campo obrigatório"),
      })}
      initialValues={{ nome: "", senha: "", documento: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        if (isMember) {
          setupUser(values, "login")
            .then((res) => {
              if(res.data.user.tipo === 'fornecedor'){
                navigate("/dashboard-fornecedor");                
              }else{
                navigate("/dashboard");
              }
              successNotification(
                "Sucesso!",
                "Usuario logado com sucesso!"
              );
            })
            .catch((err) => {
              console.log(err);
              errorNotification(err.code, err.response.data.msg);
            })
            .finally(() => {
              setSubmitting(false);
            });
        } else {
          setupUser(values, "register")
            .then((res) => {
              if(res.data.user.tipo === 'fornecedor'){
                navigate("/dashboard-fornecedor");                
              }else{
                navigate("/dashboard");
              }              
              successNotification(
                "Sucesso!",
                "Usuario registrado com sucesso!"
              );
            })
            .catch((err) => {
              console.log(err);
              errorNotification(err.code, err.response.data.msg);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }
      }}
    >
      {({ isValid, isSubmitting }) => (
        <Form>
          <Stack mt={15} spacing={15}>
            <MyTextInput
              label={"Documento"}
              name={"documento"}
              type={"text"}
              placeholder={"11122233344"}
            />
            <MyTextInput
              label={"Senha"}
              name={"senha"}
              type={"senha"}
              placeholder={"senha"}
            />
            {!isMember && (
              <MyTextInput
                label={"Nome"}
                name={"nome"}
                type={"text"}
                placeholder={"nome"}
              />
            )}

            <Button type={"submit"} isDisabled={!isValid || isSubmitting}>
              {isMember ? "Login" : "Registrar"}{" "}
            </Button>
            <Text>
              {isMember ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
              <button type="button" onClick={() => setIsMember(!isMember)}>
                {isMember ? "Cadastrar-se" : "Faça seu login"}
              </button>
            </Text>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

const Login = () => {
  const { isUserAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserAuthenticated()) {
      navigate("/dashboard");
    }
  });

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} alignItems={"center"} justifyContent={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Image src={logo} alt={"Logo"} alignSelf={"center"} />
          {/* <Heading fontSize={"2xl"} mb={15}>
            Faça seu cadastro!
          </Heading> */}
          <LoginForm />
        </Stack>
      </Flex>
    </Stack>
  );
};

export default Login;
