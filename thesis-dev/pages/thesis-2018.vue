<template>
    <el-container>
        <el-main>
            <div>
            <div id="cover">
                <iframe height="100%" width="100%" src="http://events.newschool.edu/event/data_visualization_keynotes"></iframe>
                <img src="./img/cover-2018.jpg">
            </div>
            <div class="container">

                <!--MENU-->

                <el-row :gutter="20">
                    <div id="banner">
                        <div id="site_lockup">
                            <el-col :span="18" :push="3">
                                    <h1 class="u_name col-md-12">
                                    <a href="http://newschool.edu/" target="_blank">
                                        <span class="font-width-1">T</span><span class="font-width-2">h</span><span class="font-width-1">e</span><span class="font-width-1">&nbsp;</span><span class="font-width-2">N</span><span class="font-width-1">e</span><span class="font-width-3">w</span><span class="font-width-1">&nbsp;</span><span class="font-width-1">S</span><span class="font-width-1">c</span><span class="font-width-2">h</span><span class="font-width-2">o</span><span class="font-width-2">o</span><span class="font-width-3">l</span>
                                    </a>
                                    </h1>
                            </el-col>
                            <el-col :span="18" :push="3">
                                <div class="bottom-stripe col-md-12">
                                <div class="bottom-stripe-inner"></div>
                                </div>
                            </el-col>
                            <el-col :span="18" :push="3" :xs="24" :sm="18" :md="12" :lg="8" :xl="8">
                                <div id="stripe_menu" class="col-md-12">
                                    <div id="inner-menu-stripe" class="bottom-stripe">
                                        <div class="bottom-stripe-inner"></div>
                                    </div>
                                    <h1 class="sitename"><span class="font-width-3 kern-decrease-10"><a href="http://www.newschool.edu/parsons/ms-data-visualization/" target="_blank">Data Visualization</a></span></h1>
                                </div>
                            </el-col>
                            <el-col :span="18" :push="3">
                                <div class="msdv-subtitle font-width-3 kern-decrease-10 col-md-10">
                                Thesis Projects and Research
                                </div>
                            </el-col>
                        </div>
                    </div>

                    <el-col :span="18" :push="3">
                        <div class="grid-content">
                            <div class="content">
                                <h2 class="col-md-10 col-md-offset-1">
                                This interdisciplinary graduate program brings together design, statistics, and computer science, developing critical abilities and facility for innovation in work settings in which data increasingly shapes opinion, policy, and decision-making.
                                </h2>
                            </div>
                        </div>
                    </el-col>
                </el-row>

                <!--YEAR-->

                <el-row :gutter="20">
                    <el-col :span="18" :offset="3">
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
                    <el-col :span="18"  :offset="3">
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
                    <el-col :span="18" :offset="3">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <aside class="col-md-12 red">Society and Politics</aside>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <aside class="col-md-12">&nbsp;</aside>
                    </el-col>
                </el-row>

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--Benzamin Yi (2018)-->
                    <el-col :span="6" :offset="3">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Benzamin Yi</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                    
                        <a id="benzamin"></a>
                        <div
                        github-src="https://github.com/benzyi/thesis"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            The Los Angeles Riots 1992
                            </span>
                            <br>
                            <span class="subtitle">
                            A Memorial and Historical Archive of the Los Angeles Riots in 1992 Through the Lens of Those Who Lost Their Lives
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2018/benzaminYi" target="_blank">
                            <img slot="image-benzamin" src="preview-2018/benzamin.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            The Los Angeles Riots of 1992 has a personal story to me that I only realized after doing research many years later. In order to follow...
                        </p> 
                        </div>
                    </el-col>

                    <!--Elena Paunova (2018)-->
                    <el-col :span="6">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Elena Paunova</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="elena"></a>
                        <div
                        github-src=""
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Nice To Meet You
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="http://youmeet.me/" target="_blank">
                            <img slot="image-elena" src="preview-2018/elena.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            Nice to meet you is about measuring ethnic, linguistic, religious, and cultural heterogeneity in the world. We intuitively understand that...
                        </p>
                        </div>
                    </el-col>

                    <!--Max Carradine (2018)-->
                    <el-col :span="6">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Max Carradine</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="max"></a>
                        <div
                        github-src="https://github.com/mbcarradine/mbcarradine.github.io/tree/master/thesis"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            The Influencers
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2018/maxCarradine/thesis" target="_blank">
                            <img slot="image-max" src="preview-2018/max.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            Every two years we witness an unconscionable amount of money being spent in an election cycle while candidates and elected officials...
                        </p>
                        </div>
                    </el-col>

                </el-row>

                <!--SECTION-->

                <el-row :gutter="20">
                    <el-col :span="18" :offset="3">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <aside class="col-md-12 red">Language and Understanding</aside>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <aside class="col-md-12">&nbsp;</aside>
                    </el-col>
                </el-row>

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--Steven Hubbard (2018)-->
                    <el-col :span="6" :offset="3">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Steven Hubbard</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="steven"></a>
                        <div
                        github-src="https://github.com/hubideal/hubideal.github.io/tree/master/thesisHubbard"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Patterns of Professional Identity in STEM Education
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2018/stevenHubbard/" target="_blank">
                            <img slot="image-steven" src="preview-2018/steven.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            Students perform better in the classroom when their teachers are proficient in the subject they teach and demonstrate high levels of...
                        </p>
                        </div>
                    </el-col>

                    <!--Ellie Frymire (2018)-->
                    <el-col :span="6">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Ellie Frymire</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="ellie"></a>
                        <div
                        github-src="https://github.com/efrymire/thesis"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            An Exploration of the Social Movement #metoo
                            </span>
                            <br>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2018/ellieFrymire" target="_blank">
                            <img slot="image-ellie" src="preview-2018/ellie.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            Following the wake of several women coming forward against Harvey Weinstein, on October 15th, 2017, Alyssa Milano started an online...
                        </p>
                        </div>
                    </el-col>

                    <!--Flávio Pessoa Sant'Anna (2018)-->
                    <el-col :span="6">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Flávio Pessoa Sant'Anna</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="flavio"></a>
                        <div
                        github-src="https://github.com/pessoaflavio/thesis"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            The Relationship Between Computer-Science Education and Computational Trends in Github
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2018/flavioPessoa/thesis" target="_blank">
                            <img slot="image-flavio" src="preview-2018/flavio.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            Teaching children how to code is a common goal in education in the US. Initiatives by the public and private sectors – such as code.org and...
                        </p>
                        </div>
                    </el-col>

                </el-row>

                <!--SECTION-->

                <el-row :gutter="20">
                    <el-col :span="18" :offset="3">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <aside class="col-md-12 red">Competition and Play</aside>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <aside class="col-md-12">&nbsp;</aside>
                    </el-col>
                </el-row>

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--Julian Lange (2018)-->
                    <el-col :span="6" :offset="3">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Julian Lange</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="julian"></a>
                        <div
                        github-src="https://github.com/julianhlange/thesis"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            On and Beyond the Edge
                            </span>
                            <br>
                            <span class="subtitle">
                            Visual Stories of Winning Margins in Elite Sports
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2018/julianLange" target="_blank">
                            <img slot="image-julian" src="preview-2018/julian.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            Olympic Games and World Championships showcase the world’s best athletes. While medalists earn a significant premium over fourth...
                        </p>
                        </div>
                    </el-col>

                    <!--Kevin Lee (2018)-->
                    <el-col :span="6">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Kevin Lee</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="kevin"></a>
                        <div
                        github-src="https://github.com/noalarms/noalarms.github.io"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            What Movies Are Selling You
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2018/kevinLee" target="_blank">
                            <img slot="image-kevin" src="preview-2018/kevin.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            A look at product placement in popular movies, the brands being marketed to you, and a shot-by-shot product analysis of the film that...
                        </p>
                        </div>
                    </el-col>

                    <!--Michal Bacon (2018)-->
                    <el-col :span="6">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Michal Bacon</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="michal"></a>
                        <div
                        github-src="https://github.com/visualizedata/socialdilemmas"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Escaping Social Dilemmas
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2018/michalBacon" target="_blank">
                            <img slot="image-michal" src="preview-2018/michal.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            In game theory, social dilemmas are situations where the interests of the individual stand in direct opposition to the interests of the many...
                        </p>
                        </div>
                    </el-col>

                </el-row>

                <!--SECTION-->

                <el-row :gutter="20">
                    <el-col :span="18" :offset="3">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <aside class="col-md-12 red">Landscapes and Pathways</aside>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <aside class="col-md-12">&nbsp;</aside>
                    </el-col>
                </el-row>

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--Will Su (2018)-->
                    <el-col :span="6" :offset="3">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Will Su</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="will"></a>
                        <div                       
                        github-src="https://github.com/Jiahao01121/refugee-flow"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Refugee-Flow
                            </span>
                            <br>
                            <span class="subtitle">
                            A Comparative Study of Armed Conflict and Refugee Flows
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="http://refugeeflow.world/landing" target="_blank">
                            <img slot="image-will" src="preview-2018/will.gif"/>
                            </a>
                        </vue-load-image>                         
                        <p class="col-md-9">
                            To date, there were an unprecedented 65.6 million forcibly displaced people worldwide, or in other words, one out of every 113 people on Earth...
                        </p>
                        </div>
                    </el-col>

                    <!--George Sieniawski (2018)-->
                    <el-col :span="6">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">George Sieniawski</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="george"></a>
                        <div                        
                        github-src="https://github.com/sieng146/thesis"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Strength in Numbers
                            </span>
                            <br>
                            <span class="subtitle">
                            Mapping U.S. Naval Diplomacy, 2012-2018
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2018/georgeSieniawski/public" target="_blank">
                            <img slot="image-george" src="preview-2018/george.png"/>
                            </a>
                        </vue-load-image>                         
                        <p class="col-md-9">
                            Global seapower competition is intensifying. As China dredges up ≈3,200 acres of territory ex nihilo in the South China Sea and emplaces...
                        </p>
                        </div>
                    </el-col>

                    <!--Joe Steele (2018)-->
                    <el-col :span="6">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Joe Steele</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="joe"></a>
                        <div
                        github-src="https://github.com/jsteele2003/msdv_thesis"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Moving the Line
                            </span>
                            <br>
                            <span class="subtitle">
                            Shifting Borders in American Cities
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2018/joeSteele/redlining/dist" target="_blank">
                            <img slot="image-joe" src="preview-2018/joe.png"/>
                            </a>
                        </vue-load-image>                        
                        <p class="col-md-9">
                            In the 1930's, the Home Owner's Loan Corporation was conceived with the singular purpose of providing federal support on mortgage...
                        </p>
                        </div>
                    </el-col>

                </el-row>

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--Aucher Serr (2018)-->
                    <el-col :span="6" :offset="3">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Aucher Serr</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="aucher"></a>
                        <div
                        github-src="https://github.com/auchers/data-visualization-thesis"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Exploring the Potential of Green Roofs in NYC
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://auchers.github.io/data-visualization-thesis/#/" target="_blank">
                            <img slot="image-aucher" src="preview-2018/aucher.png"/>
                            </a>
                        </vue-load-image>                        
                        <p class="col-md-9">
                            This thesis explores the ways in which green roofs can be used to counteract three major urban ecological challenges in New York...
                        </p>
                        </div>
                    </el-col>
                </el-row>

                <!--SECTION-->

                <el-row :gutter="20">
                    <el-col :span="18" :offset="3">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <aside class="col-md-12 red">Food and Agriculture</aside>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <aside class="col-md-12">&nbsp;</aside>
                    </el-col>
                </el-row>

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--Yicen Shi (2018)-->
                    <el-col :span="6" :offset="3">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Yicen Shi</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="yicen"></a>
                        <div                       
                        github-src="https://github.com/shiy918/thesis"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Bacteria Invasion
                            </span>
                            <br>
                            <span class="subtitle">
                            Is Your Favorite Food Contaminated?
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2018/yicenShi/visualizations" target="_blank">
                            <img slot="image-yicen" src="preview-2018/yicen.png"/>
                            </a>
                        </vue-load-image>                         
                        <p class="col-md-9">
                            Food safety is essential to civilizations. Consumption of bacteria contaminated food could result in various physiological consequences...
                        </p>
                        </div>
                    </el-col>

                    <!--Rye Zupancis (2018)-->
                    <el-col :span="6">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Rye Zupancis</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="rye"></a>
                        <div                       
                        github-src="https://github.com/ryezzz/Sub-Saharan-Africa-NDVI-Analysis"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Vegetation and Socioeconomic Shifts in sub-Saharan Africa
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2018/ryeZupancis" target="_blank">
                            <img slot="image-rye" src="preview-2018/rye.png"/>
                            </a>
                        </vue-load-image>                         
                        <p class="col-md-9">
                            Vegetation indices derived from satellite flyover data tend to correlate with GDP, particularly in agrarian economies. This analysis explores...
                        </p>
                        </div>
                    </el-col>

                    <!--Rik Ghosh (2018)-->
                    <el-col :span="6">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Rik Ghosh</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="yicen"></a>
                        <div                       
                        github-src="https://github.com/rikghosh/thesis"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            A Century of American Food
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2018/rikGhosh" target="_blank">
                            <img slot="image-yicen" src="preview-2018/rik.png"/>
                            </a>
                        </vue-load-image>                         
                        <p class="col-md-9">
                            Americans are thought to be fond of following fad diets, paradigms of eating often based on novel, ever-changing nutrition research...
                        </p>
                        </div>
                    </el-col>                                                         

                </el-row>

                <!--FOOTER-->

                <el-row :gutter="20">
                    <el-col :span="18" :offset="3">

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
                
                    <!--MS Data Visualization 2018-->
                    <el-col :span="6" :offset="3">

                        <div class="col-md-3">

                        <p><a href="http://www.newschool.edu/parsons/ms-data-visualization/" target="_blank">MS Data Visualization 2018</a></p>
                        <br />
                        <a href="https://github.com/visualizedata/socialdilemmas">Michal Bacon</a>
                        <br /> <a href="https://github.com/mbcarradine/mbcarradine.github.io/tree/master/thesis">Max Carradine</a>
                        <br /> <a href="https://github.com/efrymire/thesis">Ellie Frymire</a>
                        <br /> <a href="https://github.com/rikghosh/thesis">Rik Ghosh</a>
                        <br /> <a href="https://github.com/hubideal/hubideal.github.io/tree/master/thesisHubbard">Steven Hubbard</a>
                        <br /> <a href="https://github.com/julianhlange/thesis">Julian Lange</a>
                        <br /> <a href="https://github.com/noalarms/noalarms.github.io">Kevin Lee</a>
                        <br /> <a href="">Elena Paunova</a>
                        <br /> <a href="https://github.com/pessoaflavio/thesis">Flávio Pessoa Sant'Anna</a>
                        <br /> <a href="https://github.com/auchers/data-visualization-thesis">Aucher Serr</a>
                        <br /> <a href="https://github.com/shiy918/thesis">Yicen Shi</a>
                        <br /> <a href="https://github.com/sieng146/thesis">George Sieniawski</a>
                        <br /> <a href="https://github.com/jsteele2003/msdv_thesis">Joe Steele</a>
                        <br /> <a href="https://github.com/Jiahao01121/refugee-flow">Will Su</a>
                        <br /> <a href="https://github.com/benzyi/thesis">Benzamin Yi</a>
                        <br /> <a href="https://github.com/ryezzz/Sub-Saharan-Africa-NDVI-Analysis">Rye Zupancis</a>

                        </div>

                    </el-col>

                    <!--Thesis Advisor-->
                    <el-col :span="6">

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
                    <el-col :span="6">

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
                    <el-col :span="18" :offset="3">

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
