<template>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.el-select-dropdown__item {
  font-family: "neue-regular";
  font-size: 12px;
}

@font-face {
  font-family: "neue-regular";
  src: url("./assets/fonts/Neue-Regular.eot?#iefix") format("embedded-opentype"),
    url("./assets/fonts/Neue-Regular.otf") format("opentype"),
    url("./assets/fonts/Neue-Regular.woff") format("woff"),
    url("./assets/fonts/Neue-Regular.ttf") format("truetype"),
    url("./assets/fonts/Neue-Regular.svg#fonts/Neue-Regular") format("svg");
  font-weight: normal;
  font-style: normal;
}

/*Regular Italic*/

@font-face {
  font-family: "neue-regular-italic";
  src: url("./assets/fonts/Neue-RegularItalic.eot?#iefix")
      format("embedded-opentype"),
    url("./assets/fonts/Neue-RegularItalic.otf") format("opentype"),
    url("./assets/fonts/Neue-RegularItalic.woff") format("woff"),
    url("./assets/fonts/Neue-RegularItalic.ttf") format("truetype"),
    url("./assets/fonts/Neue-RegularItalic.svg#fonts/Neue-RegularItalic")
      format("svg");
  font-weight: normal;
  font-style: normal;
}

/*Display Random*/

@font-face {
  font-family: "neue-display-random";
  src: url("./assets/fonts/NeueDisplay-Random.eot?#iefix")
      format("embedded-opentype"),
    url("./assets/fonts/NeueDisplay-Random.otf") format("opentype"),
    url("./assets/fonts/NeueDisplay-Random.woff") format("woff"),
    url("./assets/fonts/NeueDisplay-Random.ttf") format("truetype"),
    url("./assets/fonts/NeueDisplay-Random.svg#fonts/NeueDisplay-Random")
      format("svg");
  font-weight: normal;
  font-style: normal;
}

/*Display Black*/

@font-face {
  font-family: "neue-display";
  src: url("./assets/fonts/NeueDisplay-Black.eot?#iefix")
      format("embedded-opentype"),
    url("./assets/fonts/NeueDisplay-Black.otf") format("opentype"),
    url("./assets/fonts/NeueDisplay-Black.woff") format("woff"),
    url("./assets/fonts/NeueDisplay-Black.ttf") format("truetype"),
    url("./assets/fonts/NeueDisplay-Black.svg#fonts/NeueDisplay-Black")
      format("svg");
  font-weight: normal;
  font-style: normal;
}

/*Display Wide*/

@font-face {
  font-family: "neue-display-wide";
  src: url("./assets/fonts/NeueDisplay-Wide.eot?#iefix")
      format("embedded-opentype"),
    url("./assets/fonts/NeueDisplay-Wide.otf") format("opentype"),
    url("./assets/fonts/NeueDisplay-Wide.woff") format("woff"),
    url("./assets/fonts/NeueDisplay-Wide.ttf") format("truetype"),
    url("./assets/fonts/NeueDisplay-Wide.svg#fonts/NeueDisplay-Wide")
      format("svg");
  font-weight: normal;
  font-style: normal;
}

/*Display Ultra*/

@font-face {
  font-family: "neue-display-ultra";
  src: url("./assets/fonts/NeueDisplay-Ultra.eot?#iefix")
      format("embedded-opentype"),
    url("./assets/fonts/NeueDisplay-Ultra.otf") format("opentype"),
    url("./assets/fonts/NeueDisplay-Ultra.woff") format("woff"),
    url("./assets/fonts/NeueDisplay-Ultra.ttf") format("truetype"),
    url("./assets/fonts/NeueDisplay-Ultra.svg#fonts/NeueDisplay-Ultra")
      format("svg");
  font-weight: normal;
  font-style: normal;
}

::placeholder {
  /* Chrome/Opera/Safari */
  font-family: "neue-regular";
  font-size: 12px;
}
::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  font-family: "neue-regular";
  font-size: 12px;
}
::-moz-placeholder {
  /* Firefox 19+ */
  font-family: "neue-regular";
  font-size: 12px;
}
:-ms-input-placeholder {
  /* IE 10+ */
  font-family: "neue-regular";
  font-size: 12px;
}
:-moz-placeholder {
  /* Firefox 18- */
  font-family: "neue-regular";
  font-size: 12px;
}

.el-popper {
  font-family: "neue-regular";
  font-size: 12px;
}
.el-input__inner {
  font-family: "neue-regular";
  font-size: 12px;
}
</style>
