import App from 'next/app'
import React from 'react'
import {PageTransition} from 'next-page-transitions'
import '../public/style.css'; // Global CSS for App
import "bootstrap/dist/css/bootstrap.min.css";
import {HttpRequest} from "../helpers/http.helper";
import Router from 'next/router';

export default class MyApp extends App {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
        }
    }

    static async getInitialProps({Component, router, ctx}) {

        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return {pageProps};
    }

    render() {
        const {Component, pageProps, router} = this.props;
        return (
            <section>
                <PageTransition timeout={300} classNames="page-transition">
                    <Component {...pageProps} key={router.route} loggedIn={this.state.loggedIn}/>
                </PageTransition>
                <style jsx global>{`
          .page-transition-enter {
            opacity: 0;
          }
          .page-transition-enter-active {
            opacity: 1;
            transition: opacity 300ms;
          }
          .page-transition-exit {
            opacity: 1;
          }
          .page-transition-exit-active {
            opacity: 0;
            transition: opacity 300ms;
          }
        `}
                </style>
            </section>
        );
    }
}