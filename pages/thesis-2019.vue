<template>
    <el-container>
        <el-main>
            <div>
            <div id="cover">
                <iframe height="100%" width="100%" src="https://visualizedata.github.io/keynotes/"></iframe>
                <img src="./img/cover-2019.jpg">
            </div>
            <div class="container">

                <!--MENU-->

                <el-row :gutter="20">
                    <el-col :span="18" :offset="3" :xs="{span: 24, offset: 1}">
                        <div id="banner">
                            <div id="site_lockup">
                                <h1 class="u_name col-md-12">
                                <a href="http://newschool.edu/" target="_blank">
                                    <span class="font-width-1">T</span><span class="font-width-2">h</span><span class="font-width-1">e</span><span class="font-width-1">&nbsp;</span><span class="font-width-2">N</span><span class="font-width-1">e</span><span class="font-width-3">w</span><span class="font-width-1">&nbsp;</span><span class="font-width-1">S</span><span class="font-width-1">c</span><span class="font-width-2">h</span><span class="font-width-2">o</span><span class="font-width-2">o</span><span class="font-width-3">l</span>
                                </a>
                                </h1>
                                <div class="bottom-stripe col-md-12">
                                <div class="bottom-stripe-inner"></div>
                                </div>
                                <div id="stripe_menu" class="col-md-12">
                                    <div id="inner-menu-stripe" class="bottom-stripe">
                                        <div class="bottom-stripe-inner"></div>
                                    </div>
                                    <h1 class="sitename"><span class="font-width-3 kern-decrease-10"><a href="http://www.newschool.edu/parsons/ms-data-visualization/" target="_blank">Data Visualization</a></span></h1>
                                </div>
                                <div class="msdv-subtitle font-width-3 kern-decrease-10 col-md-10">
                                Thesis Projects and Research
                                </div>
                            </div>
                        </div>
                    </el-col>

                    <el-col :span="18" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="grid-content">
                            <div class="content">
                                <h2 class="col-md-10 col-md-offset-1">
                                This interdisciplinary graduate program brings together design, statistics, and computer science, developing critical abilities and facility for innovation in work settings in which data increasingly shapes opinion, policy, and decision-making.
                                </h2>
                            </div>
                        </div>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-10 col-md-offset-1">
                        <a href="https://livestream.com/thenewschool/dataviz-keynotes-2020" target="_blank"><i class='fa fa-play-circle' style='font-size:`16px'></i> Watch the Keynote Presentations</a>
                        </h3>
                    </el-col>
                </el-row>

                <!--YEAR-->

                <el-row :gutter="20">
                    <el-col :span="18" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                            <div class="bottom-stripe-inner"></div>
                        </div>
                    </el-col>
                    <el-col :span="4" :offset="3">
                        <div class="font-width-2 col-xs-4">
                            <router-link to="/thesis-2020">2020</router-link>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="font-width-2 col-xs-2 text-right">
                            <router-link to="/thesis-2019">2019</router-link>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="font-width-2 col-xs-2 text-right">
                            <router-link to="/thesis-2018">2018</router-link>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="font-width-2 col-xs-2 text-right">
                            <router-link to="/thesis-2017">2017</router-link>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="font-width-2 col-xs-2 text-right">
                            <router-link to="/thesis-2016">2016</router-link>
                        </div>
                    </el-col>          
                </el-row>

                <!--SEARCH-->

                <el-row :gutter="20">
                    <el-col :span="18" :offset="3" :xs="{span: 22, offset: 1}">
                        <div class="col-md-12 col-md-10 col-md-offset-1">

                            <!--build search function here-->                    
                            <el-input
                                placeholder="Search or enter keyword"
                                prefix-icon="el-icon-search"
                                v-model="input">
                            </el-input>

                        </div>
                    </el-col>
                </el-row>

                <!--SECTION-->

                <el-row :gutter="20">
                    <el-col :span="18" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <aside class="col-md-12 red">Art and Leisure</aside>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <aside class="col-md-12">&nbsp;</aside>
                    </el-col>
                </el-row>

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--Nic Stark (2019)-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Nic Stark</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                    
                        <a id="nic"></a>
                        <div
                        github-src="https://github.com/nicstark/thesis"
                        video-src="https://github.com/nicstark/thesis/blob/master/public/demo.mp4?raw=true"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Cambrian Analytica
                            </span>
                            <br>
                            <span class="subtitle">
                            What would it take for people to care about their personal data?
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2019/nicStark/MicroSite/" target="_blank">
                            <img slot="image-nic" src="preview-2019/nic.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            Cambrian Analytica is a speculative design project that aims to answer the question: “What would it take for people to care about their personal...
                        </p> 
                        </div>
                    </el-col>

                    <!--Simone Rachelle Betito (2019)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Simone Rachelle Betito</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="simon"></a>
                        <div
                        github-src="https://github.com/simone-betito/msdv-thesis-SB"
                        video-src="https://github.com/simone-betito/msdv-thesis-SB/blob/master/demo.mov?raw=true"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Repatriation
                            </span>
                            <br>
                            <span class="subtitle">
                            An Approach For A Fairer Museum
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2019/simoneRachelleBetito/" target="_blank">
                            <img slot="image-simone" src="preview-2019/simone.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            Museums are bastions of culture, they hold artifacts from all over the world. These artifacts hold different meanings to different people and...
                        </p>
                        </div>
                    </el-col>

                    <!--Emily Chu (2019)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Emily Chu</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="emily"></a>
                        <div
                        github-src="https://github.com/3milychu/thesis"
                        video-src="https://github.com/3milychu/thesis/blob/master/demo.mp4?raw=true"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Notes on Perspective
                            </span>
                            <br>
                            <span class="subtitle">
                            An application that visually reconstructs the thoughts and feelings which occurred during a classical musical performance
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2019/emilyChu/" target="_blank">
                            <img slot="image-emily" src="preview-2019/emily.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            Notes on Perspective experiments with making visually tangible and beautiful the thoughts and feelings that occured during a musical...
                        </p>
                        </div>
                    </el-col>

                </el-row>

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--Clare Churchouse (2019)-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Clare Churchouse</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="clare"></a>
                        <div
                        github-src="https://github.com/churc/MajorStudio2"
                        video-src="https://github.com/churc/MajorStudio2/blob/master/images/MS2_clare_VLC.m4v?raw=true"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Do museums reflect who we are as a society?
                            </span>
                        </p>
                        <br>                                            
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2019/clareChurchouse/" target="_blank">
                            <img slot="image-clare" src="preview-2019/clare.png"/>
                            </a>
                        </vue-load-image>

                        <p class="col-md-9">
                            Art museums are institutions that collect, curate, and exhibit works of art for the public. In so doing, they interpret, comment on, present...
                        </p>
                        </div>
                    </el-col>
                    
                    <!--Kiril Traykov (2019)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Kiril Traykov</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="kiril"></a>
                        <div
                            github-src="https://github.com/kiriltraykov/kiriltraykov.github.io/tree/master/thesis"
                            video-src="https://github.com/kiriltraykov/kiriltraykov.github.io/blob/master/kiril.m4v?raw=true"
                            class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Travel in Women’s Professional Tennis
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2019/kirilTraykov/" target="_blank">
                            <img slot="image-kiril" src="preview-2019/kiril.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            Tennis is unique from other sports with the fact that there are no "home games" or "regional conferences" for the players and all tournaments...
                        </p>
                        </div>
                    </el-col>

                </el-row>

                <!--SECTION-->

                <el-row :gutter="20">
                    <el-col :span="18" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <aside class="col-md-12 red">Health and Livelihood</aside>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <aside class="col-md-12">&nbsp;</aside>
                    </el-col>
                </el-row>

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--Candice Joan Mai Chan (2019)-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Candice Joan Mai Chan</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="candice"></a>
                        <div
                        github-src="https://github.com/candicejmchan/candicethesis"
                        video-src="https://github.com/candicejmchan/candicethesis2019/blob/master/demo.mov?raw=true"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Opioids
                            </span>
                            <br>
                            <span class="subtitle">
                            The Branding and Commercialization of Pain
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://candicejmchan.github.io/candicethesis2019/#/" target="_blank">
                            <img slot="image-candice" src="preview-2019/candice.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            Over the past two decades, the branding and commercialization of opioids has created one of the greatest commercial successes...
                        </p>
                        </div>
                    </el-col>

                    <!--Colleen McCaffrey (2019)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Colleen McCaffrey</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="colleen"></a>
                        <div
                        github-src="https://github.com/colmccaffrey/thesis"
                        video-src="https://github.com/colmccaffrey/thesis/blob/master/src/documentation/demo.mov?raw=true"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            The Sum of Us
                            </span>
                            <br>
                            <span class="subtitle">
                            What can crowdfunding tell us about the U.S. healthcare gap?
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2019/colleenMcCaffrey/src/" target="_blank">
                            <img slot="image-colleen" src="preview-2019/colleen.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            Using a hybrid approach of structured and unstructured learning, and the people-first philosophy of human-centered design, this project...
                        </p>
                        </div>
                    </el-col>

                    <!--Batool Akbar (2019)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Batool Akbar</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="batool"></a>
                        <div
                        github-src="https://github.com/bsakbar/thesis"
                        video-src="https://github.com/bsakbar/thesis/blob/master/assets/demo.mov?raw=true"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Understand Your Blood, Your Data
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2019/batoolAkbar/web/home.html" target="_blank">
                            <img slot="image-batool" src="preview-2019/batool.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            Blood is a fascinating component of the human body. With only a few drops of blood, we can learn a lot about the conditions of our bodies...
                        </p>
                        </div>
                    </el-col>

                </el-row>

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--Felix Buchholz (2019)-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Felix Buchholz</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="felix"></a>
                        <div
                        github-src="https://github.com/felixbuchholz/thesis"
                        video-src="https://raw.githubusercontent.com/felixbuchholz/thesis2019/master/public/assets/demo.mov"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Universal Income Guarantees
                            </span>
                            <br>
                            <span class="subtitle">
                            An opportunity to rethink welfare?
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://felixbuchholz.github.io/thesis2019/" target="_blank">
                            <img slot="image-felix" src="preview-2019/felix.gif"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            In a climate of polarization, a peculiar idea might have the potential to reach across political frontiers: the idea to grant every citizen a...
                        </p>
                        </div>
                    </el-col>

                    <!--Mikaela Ergas Lenett (2019)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Mikaela Ergas Lenett</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="mikaela"></a>
                        <div
                        github-src="https://github.com/mikaela-el/thesis"
                        video-src="https://github.com/mikaela-el/thesis/blob/master/demo.mov?raw=true"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            From the Supreme Court to the States
                            </span>
                            <br>
                            <span class="subtitle">
                            Visualizing Women’s Reproductive Rights
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2019/mikaelaErgasLenett/" target="_blank">
                            <img slot="image-mikaela" src="preview-2019/mikaela.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            Throughout history, both the Supreme Court and lower levels of government have played essential roles in determining the extent to...
                        </p>
                        </div>
                    </el-col>

                </el-row>

                <!--SECTION-->

                <el-row :gutter="20">
                    <el-col :span="18" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <aside class="col-md-12 red">Media and Society</aside>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <aside class="col-md-12">&nbsp;</aside>
                    </el-col>
                </el-row>

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--Alonso Alcocer Guemez (2019)-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Alonso Alcocer Guemez</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="alonso"></a>
                        <div
                        github-src="https://github.com/alonsoag86/msdv-final"
                        video-src="https://github.com/alonsoag86/msdv-final/blob/master/demo.m4v?raw=true"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            2016
                            </span>
                            <br>
                            <span class="subtitle">
                            A Year in News – Mexico Through the Lens of U.S. Media
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2019/alonsoAlcocerGuemez/" target="_blank">
                            <img slot="image-alonso" src="preview-2019/alonso.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            The following visual essay explores the behavior of the U.S. media at a historical turning point in the bilateral relations between the U.S...
                        </p>
                        </div>
                    </el-col>

                    <!--Jed Crocker (2019)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Jed Crocker</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="jed"></a>
                        <div
                        github-src="https://github.com/okhobb/jedrs-thesis"
                        video-src="https://github.com/jed-c/thesis-video/raw/master/demo.m4v"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Visually Exploring the American Archive of Public Broadcasting
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="http://jedcrocker.com/thesis/#/" target="_blank">
                            <img slot="image-jed" src="preview-2019/jed.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            The American Archive of Public Broadcasting is a collaboration between PBS flagship station WGBH in Boston and the Library of...
                        </p>
                        </div>
                    </el-col>

                    <!--Stephanie Yung (2019)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Stephanie Yung</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="stephanie"></a>
                        <div
                        github-src="https://github.com/ssyung/thesis"
                        video-src="https://github.com/ssyung/thesis/blob/master/documentation/demo.m4v?raw=true"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            All the Queens Voices
                            </span>
                            <br>
                            <span class="subtitle">
                            An Oral History, Visualized. A data visualization of Queens Memory program`s 400+ oral history interviews collected in Queens, New York.
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://ssyung.github.io/thesis/" target="_blank">
                            <img slot="image-stephanie" src="preview-2019/stephanie.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            Oral history is a method of historical inquiry rooted in dialogue between an interviewer and an interviewee. The practice predates the written...
                        </p>
                        </div>
                    </el-col>

                </el-row>

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--Isabel Verkes (2019)-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Isabel Verkes</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="isabel"></a>
                        <div
                        github-src="https://github.com/IsVer/mst/"
                        video-src="https://github.com/ssyung/thesis/blob/master/documentation/demo.m4v?raw=true"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Passive Activism
                            </span>
                            <br>
                            <span class="subtitle">
                            Environmental Shareholder Activism and the Role of Index Funds
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2019/isabelVerkes/" target="_blank">
                            <img slot="image-isabel" src="preview-2019/isabel.png"/>
                            </a>
                        </vue-load-image>                        
                        <p class="col-md-9">
                            The increase in passively invested money, index funds, is affecting the relationship between management and shareholders in basically...
                        </p>
                        </div>
                    </el-col>

                    <!--Suzanna Schmeelk (2019)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Suzanna Schmeelk</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="suzanna"></a>
                        <div
                        github-src="https://github.com/schmeelk/SchmeelkIdentityTheftVizThesis"
                        video-src="https://schmeelk.github.io/SchmeelkIdentityTheftVizThesis/AnatomyOfABreach.mov"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Identity Theft
                            </span>
                            <br>
                            <span class="subtitle">
                            Anatomy of a Data Breach
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2019/suzannaSchmeelk/identitytheft.html#slide=1" target="_blank">
                            <img slot="image-suzanna" src="preview-2019/suzanna.jpg"/>
                            </a>
                        </vue-load-image>                            
                        <p class="col-md-9">
                            This thesis examines identity theft through the lens of medical record data breaches. In the United States the federally regulated...
                        </p>
                        </div>
                    </el-col>

                </el-row>

                <!--SECTION-->

                <el-row :gutter="20">
                    <el-col :span="18" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <aside class="col-md-12 red">Data and Policy</aside>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <aside class="col-md-12">&nbsp;</aside>
                    </el-col>
                </el-row>

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--Andrew Levinson (2019)-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Andrew Levinson</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="andrew"></a>
                        <div                       
                        github-src="https://github.com/AndrewLevinson/thesis"
                        video-src="https://raw.githubusercontent.com/AndrewLevinson/thesis/master/src/assets/demo.mov"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            The United States Water Crisis
                            </span>
                            <br>
                            <span class="subtitle">
                            How Changes to the Natural Water Cycle and Increasing Demand are Causing Water Stress
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://thewatercrisis.us/" target="_blank">
                            <img slot="image-andrew" src="preview-2019/andrew.png"/>
                            </a>
                        </vue-load-image>                         
                        <p class="col-md-9">
                            Freshwater has been described as the oil of the 21st century. In the wake of extreme water stress events across the globe in places like Cape Town...
                        </p>
                        </div>
                    </el-col>

                    <!--Michael Wolf (2019)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Michael Wolf</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="michael"></a>
                        <div                        
                        github-src="https://github.com/wolfm2/thesis"
                        video-src="https://wolfm2.github.io/thesis/demo.mp4"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            How Fragile is the Sahel?
                            </span>
                            <br>
                            <span class="subtitle">
                            An Analytical Perspective on Fragility and Its Indicators
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2019/michaelWolf/" target="_blank">
                            <img slot="image-michael" src="preview-2019/michael.gif"/>
                            </a>
                        </vue-load-image>                         
                        <p class="col-md-9">
                            The Sahel region in northern Africa is a place where the member countries are joined by conflict and depravations. While it has...
                        </p>
                        </div>
                    </el-col>

                    <!--Grace Martinez (2019)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Grace Martinez</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="grace"></a>
                        <div
                        github-src="https://github.com/graceiseverywhere/thesis/"
                        video-src="https://github.com/graceiseverywhere/thesis/blob/master/demo.mov?raw=true"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Self-Storage Nation
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2019/graceMartinez/" target="_blank">
                            <img slot="image-grace" src="preview-2019/grace.jpg"/>
                            </a>
                        </vue-load-image>                        
                        <p class="col-md-9">
                            Catering to America’s material overflow, the self-storage industry has exploded into a booming $36 billion dollar market. Nearly 1 out of...
                        </p>
                        </div>
                    </el-col>

                </el-row>

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--Aaditi Rokade (2019)-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Aaditi Rokade</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="aaditi"></a>
                        <div
                        github-src="https://github.com/aaditirokade/thesis"
                        video-src="https://github.com/aaditirokade/thesis/blob/master/demo.m4v?raw=true"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Visualizing the Impact of Climate Change on Flight Experience
                            </span>
                            <br>
                            <span class="subtitle">
                            An Exploration of Domestic Travel Sector of Civil Aviation in India
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2019/aaditiRokade/thesisProject/" target="_blank">
                            <img slot="image-aaditi" src="preview-2019/aaditi.png"/>
                            </a>
                        </vue-load-image>                        
                        <p class="col-md-9">
                            This visualization explores the trends in flight cancellations and passenger complaints for some major airline carriers operating in the civil...
                        </p>
                        </div>
                    </el-col>

                    <!--Ryan Best (2019)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Ryan Best</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="ryan"></a>
                        <div
                        github-src="https://github.com/ryanabest/ms2-2019/tree/master/thesis"
                        video-src="https://raw.githubusercontent.com/ryanabest/ms2-2019/master/thesis/public/demo.mov"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Drawing Discrimination
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2019/ryanBest/" target="_blank">
                            <img slot="image-ryan" src="preview-2019/ryan.png"/>
                            </a>
                        </vue-load-image>                        
                        <p class="col-md-9">
                            This visualization explores redlining and discriminatory federal New Deal housing policy’s lasting impact on homeownership, home equity, and...
                        </p>
                        </div>
                    </el-col>                    

                </el-row>

                <!--FOOTER-->

                <el-row :gutter="20">
                    <el-col :span="18" :offset="3" :xs="{span: 24, offset: 0}">

                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <!-- <div id="about">
                    <div class="row">

                        <div class="col-md-2 text-right">
                            <p>&nbsp;</p>
                            <a href="https://github.com/visualizedata"><img data-toggle='tooltip' title='Source' src="web/img/GitHub.png" style="width:30px"></a>
                        </div> -->
                
                    <!--MS Data Visualization 2019-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">

                        <div class="col-md-3">

                        <p><a href="http://www.newschool.edu/parsons/ms-data-visualization/" target="_blank">MS Data Visualization 2019</a></p>
                        <br />
                        <a href="https://github.com/bsakbar/thesis" target="_blank">Batool Akbar</a>
                        <br /> <a href="https://github.com/ryanabest/ms2-2019/tree/master/thesis" target="_blank">Ryan Best</a>
                        <br /> <a href="https://github.com/simone-betito/msdv-thesis-SB" target="_blank">Simone Rachelle Betito</a>
                        <br /> <a href="https://github.com/felixbuchholz/thesis" target="_blank">Felix Buchholz</a>
                        <br /> <a href="https://github.com/candicejmchan/candicethesis" target="_blank">Candice Joan Mai Chan</a>
                        <br /> <a href="https://github.com/3milychu/thesis" target="_blank">Emily Chu</a>
                        <br /> <a href="https://github.com/churc/MajorStudio2" target="_blank">Clare Churchouse</a>
                        <br /> <a href="https://github.com/okhobb/jedrs-thesis" target="_blank">Jed Crocker</a>
                        <br /> <a href="https://github.com/alonsoag86/msdv-final" target="_blank">Alonso Alcocer Guemez</a>
                        <br /> <a href="https://github.com/mikaela-el/thesis" target="_blank">Mikaela Ergas Lenett</a>
                        <br /> <a href="https://github.com/AndrewLevinson/thesis" target="_blank">Andrew Levinson</a>
                        <br /> <a href="https://github.com/graceiseverywhere/thesis/" target="_blank">Grace Martinez</a>
                        <br /> <a href="https://github.com/colmccaffrey/thesis" target="_blank">Colleen McCaffrey</a>
                        <br /> <a href="https://github.com/aaditirokade/thesis" target="_blank">Aaditi Rokade</a>
                        <br /> <a href="https://github.com/schmeelk/SchmeelkIdentityTheftVizThesis" target="_blank">Suzanna Schmeelk</a>
                        <br /> <a href="https://github.com/nicstark/thesis" target="_blank">Nic Stark</a>
                        <br /> <a href="https://github.com/kiriltraykov/kiriltraykov.github.io/tree/master/thesis" target="_blank">Kiril Traykov</a>
                        <br /> <a href="https://github.com/IsVer/mst/" target="_blank">Isabel Verkes</a>
                        <br /> <a href="https://github.com/wolfm2/thesis" target="_blank">Michael Wolf</a>
                        <br /> <a href="https://github.com/ssyung/thesis" target="_blank">Stephanie Yung</a>

                        </div>

                    </el-col>

                    <!--Thesis Advisor-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">

                        <div class="col-md-3">

                        <p><a href="http://www.newschool.edu/parsons/" target="_blank">Thesis Advisor</a></p>
                        <br />
                        <a href="http://www.newschool.edu/parsons/faculty.aspx?id=4e54-5978-4d7a-4932" target="_blank">Daniel Sauter, Associate Professor</a>
                        <br />
                        <a href="https://courses.newschool.edu/courses/PGDV5200" target="_blank">PGDV Major Studio 2</a>
                        <br /><br />
                        <p>Advisors</p>
                        <br />
                        <a href="https://www.newschool.edu/parsons/faculty/aaron-hill/" target="_blank">Aaron Hill, Assistant Professor</a>
                        <br />
                        <a href="https://www.newschool.edu/parsons/faculty/Richard-The/" target="_blank">Richard The, Assistant Professor</a>
                        <br />
                        <a href="https://www.newschool.edu/parsons/faculty/Richard-The/" target="_blank">Alec Barrett, Part-Time Faculty</a>

                        </div>

                    </el-col>

                    <!--Program Contact-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">

                        <div class="col-md-3">

                        <p><a href="http://www.newschool.edu/parsons/ms-data-visualization/" target="_blank">Program Contact</a></p>
                        <br />
                        <a href="https://www.newschool.edu/parsons/faculty/daniel-sauter/" target="_blank">Daniel Sauter, Associate Professor</a>
                        <br />Program Director, Data Visualization
                        <br /><a href="http://www.newschool.edu/parsons/art-media-technology-school-amt/" target="_blank">Art, Media, and Technology</a>
                        <br /><a href="http://www.newschool.edu/parsons/" target="_blank">Parsons School of Design</a>

                        </div>
                    
                    </el-col>

                    <!-- </div>
                    </div> -->

                </el-row>

                <el-row :gutter="20">
                    <el-col :span="18" :offset="3" :xs="{span: 24, offset: 0}">

                        <div class="bottom-stripe col-md-12 marginbot-50">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                    </el-col>
                </el-row>

                <!-- <video controls autoplay id="videoPlayer">
                <source id="localSource" src=""></source>
                <source id="videoSource" src=""></source>
                </video> -->
                

            </div>
            <script src="./js/bootstrap.min.js"></script>
            <script src=".js/jquery.easing.min.js"></script>
            <script src="./js/custom.js"></script>

            </div>
        </el-main>
    </el-container>
</template>

<script>
export default {
    head: {
        title: 'Parsons Data Visualization Thesis Projects and Research',
        script: [
            { src: 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js' },
        ],
        link: [
            { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' }
        ]
    },
    data() {
        return {
            input: ''
        }
    }
}
</script>

<style src="./css/style.css"></style>
<style scoped>
  .content {
      text-align: left;
  }
  .grid-content {
      text-align: center;
      overflow: hidden;
      padding: 20px;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .row-bg {
    padding: 10px 0;
  }
</style>
