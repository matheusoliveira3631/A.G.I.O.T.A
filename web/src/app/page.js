"use client";

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import toast, { Toaster } from 'react-hot-toast';

import { useLogin } from "@/services/user/login";


export default function Home() {

  const schema = yup
  .object({
    email: yup.string().email("O Email deve estar em um formato válido").required("Preencha o email"),
    password: yup.string().required("Preencha a senha"),
  })
  .required()


  const { control, register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
 // watch input value by passing the name of it

  const { login } = useLogin();

  return (
    <div className="h-full w-full bg-white">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="">
        <img
          alt="Your Company"
          src="logo-black.png"
          className="mx-auto h-36 w-auto"
        />
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Faça login na sua conta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form 
        onSubmit={handleSubmit((data)=>{
          toast.promise(
            login(data),
             {
               loading: 'Autenticando...',
               success: <b>Sucesso! Redirecionando</b>,
               error: <b>Erro ao fazer o login</b>,
             }
           );
        })}
        control={control}
        className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                defaultValue="" {...register("email")}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p>{errors.email?.message}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Senha
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                defaultValue="" {...register("password")}
                type='password'
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password?.message}
              
            </div>
          </div>

          <div>
            <input
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            />
          </div>
        </form>      
          <a href="registro" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 flex w-full justify-center mt-5">
            Crie uma conta
          </a>
      </div>
    </div>
    <Toaster />
  </div>
  )
}
