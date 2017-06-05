import React from 'react';
import {Header, Jumbotron, Footer} from 'watson-react-components';

export default function Layout(props) {
  return (
    <html>
      <head>
        <title>GE Easy Recon</title>
        <meta charSet="utf-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon"/>
        <link rel="stylesheet" href="/css/watson-react-components.min.css"/>
        <link rel="stylesheet" href="/css/style.css"/>
        <script type="text/javascript" src="scripts/bundle.js" defer async></script>

        {/* Bluemix Analytics - begin*/}
        <script type="text/javascript">{`
          window._analytics = { coremetrics: false, optimizely: false, addRoll: false };
        `}</script>
        <meta name="segment" property="watson-demos" value="speech-to-text-demo" />
        
        {/* Bluemix Analytics  - end*/}
      </head>
      <body>
        <Header
          mainBreadcrumbs="GE AI"
          mainBreadcrumbsUrl="http://www.ge.com"
          subBreadcrumbs="Easy Recon"
          subBreadcrumbsUrl="https://demo.xencio.com"

        />
      
        <div id="root">
          {props.children}
        </div>
        
      
      </body>
    </html>
  );
}

Layout.propTypes = {
  children: React.PropTypes.object.isRequired,
  bluemixAnalytics: React.PropTypes.string,
};
