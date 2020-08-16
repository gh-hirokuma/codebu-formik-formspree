import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import logo from './logo.svg';

import tw from "twin.macro"
/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import styled from "@emotion/styled"

export default () => {
  const [serverState, setServerState] = useState({});

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Required"),
    message: Yup.string().required("Required")
  });

  const handleServerResponse = (ok, msg) => {
    setServerState({ok, msg});
  };

  const handleOnSubmit = async (values, actions) => {
    try {
      await axios({
        method: "POST",
        url: "https://formspree.io/xeqrdbgv",
        data: values
      })

      actions.setSubmitting(false);
      actions.resetForm();
      handleServerResponse(true, "Thanks!");
    } catch (err) {
      actions.setSubmitting(false);
      handleServerResponse(false, err);
    }
  };

  return (
    <div css={tw`container mx-auto h-screen flex flex-col justify-center items-center`} >
      <h1 css={tw`w-full text-center text-xl py-3`}>Contact Us</h1>
      <Formik
        initialValues={{ email: "", message: "" }}
        onSubmit={handleOnSubmit}
        validationSchema={formSchema}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form
            css={tw`flex flex-col py-4`}
            style={{ width: '400px' }}
            id="fs-frm"
            noValidate
          >
            {serverState && serverState.ok && (
              <p css={[
                tw`text-sm bg-green-100 text-green-700 mb-4 p-2 text-sm`
              ]}>
                送信完了しました
              </p>
            )}
            <label
              css={[
                tw`text-sm mb-2`,
                errors.email && touched.email && tw`text-pink-700`
              ]}
              htmlFor="email"
            >Email</label>
            <Field
              css={[
                tw`text-sm bg-gray-100 mb-1 p-2 text-sm`,
                errors.email && touched.email && tw`text-pink-700 bg-pink-100`
              ]}
              id="email"
              type="email"
              name="email"
            />
            <ErrorMessage
              css={tw`mb-4 text-xs text-pink-700`}
              name="email"
              className="errorMsg"
              component="div"
            />
            <label
              css={[tw`text-sm mb-2`, errors.message && touched.message && tw`text-pink-700`]}
              htmlFor="message"
            >Message</label>
            <Field
              css={[
                tw`text-sm bg-gray-100 mb-1 p-2 text-sm`,
                errors.message && touched.message && tw`text-pink-700 bg-pink-100`
              ]}
              id="message"
              name="message"
              component="textarea"
            />
            <ErrorMessage css={tw`mb-4 text-xs text-pink-700`} name="message" className="errorMsg" component="div" />
            <button
              css={[tw`text-sm bg-gray-100 mt-4 p-2 text-sm`, isSubmitting && tw`bg-green-100 text-green-700`]}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (<p>Submitting...</p>) : (<p>Submit</p>)}
            </button>
            {serverState && (
              <p className={!serverState.ok ? "errorMsg" : ""}>
                {serverState?.msg?.message}
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
