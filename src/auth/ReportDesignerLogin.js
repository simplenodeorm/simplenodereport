/*
 * Copyright (c) 2019 Clinical Helper
 */
import React from 'react';
import {LoginPage} from '@simplenodeorm/simplenodeclientbase/lib/LoginPage';
import { withRouter } from 'react-router';

class ReportDesignerLogin extends LoginPage  {
    constructor(props) {
        super(props);
   }

   getContext() {
       let params = new URLSearchParams(window.location.search);
       let ctx = params.get("context");
       if (ctx) {
           localStorage.setItem("__context", ctx);
       }
       return ctx;
   }

   postLogin(username, context, responseData) {
       sessionStorage.setItem('snosession', responseData.snosession);
       responseData.snosession = '';
       sessionStorage.setItem('__user', JSON.stringify(responseData));
   }
}

export default withRouter(ReportDesignerLogin);
