const template = (body, initialState) => (
  `
    <!DOCTYPE HTML>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Pro MERN Stack</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css" />
        <style>
          .panel-title a {
            display: block;
            width: 100%;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <div id="contents">${body}</div>
        <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}; </script>
        <script src="/vendor.bundle.js"></script>
        <script src="/app.bundle.js"></script>
      </body>
    </html>
  `
);

export default template;
