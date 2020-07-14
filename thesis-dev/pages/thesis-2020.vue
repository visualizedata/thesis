<template>
    <el-container>
        <el-main>
            <div>
            <div id="cover">
                <iframe height="100%" width="100%" src="https://visualizedata.github.io/keynotes/"></iframe>
                <img src="./img/cover-2020.png">
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
                        <aside class="col-md-12 red">Data and Policy</aside>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <aside class="col-md-12">&nbsp;</aside>
                    </el-col>
                </el-row>

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--Marisa Asari (2020)-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Marisa Asari</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                    
                        <a id="marisa"></a>
                        <div class="project col-md-12">
                            <p class=" col-md-3">
                                <span class="title">
                                Weapons of Mass Injustice
                                </span>
                            </p>
                            <br>
                            <vue-load-image>
                                <a href="https://weaponsofmassinjustice.netlify.app/" target="_blank">
                                <img slot="image-marisa" src="preview-2020/marisa.png"/>
                                </a>
                            </vue-load-image>
                            <p class="col-md-9">
                                Visualizing the unequal impacts of gun violence and the search for peace in America’s cities...
                            </p>
                            <br>
                            <a id="github" href="https://github.com/marisaruizasari/thesis" target="_blank">[GitHub]</a>
                            <a id="download" href="https://github.com/marisaruizasari/thesis/raw/master/demo.mp4">[Download Video]</a>
                        </div>
                    </el-col>

                    <!--Robin Coenen (2020)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Robin Coenen</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="robin"></a>
                        <div class="project col-md-12">
                            <p class=" col-md-3">
                                <span class="title">
                                With Compliments to the Secretary General
                                </span>
                            </p>
                            <br>
                            <vue-load-image>
                                <a href="https://parsons.nyc/thesis-2020/robinCoenen" target="_blank">
                                <img slot="image-robin" src="preview-2020/robin.png"/>
                                </a>
                            </vue-load-image>
                            <p class="col-md-9">
                                Visualizing Maritime Claims at the UN in regard to the Continental Shelf...
                            </p>
                            <br>
                            <a id="github" href="https://github.com/robincoenen/thesis_production" target="_blank">[GitHub]</a>
                            <a id="download" href="https://github.com/robincoenen/thesis_production/raw/master/demo.mp4">[Download Video]</a>                        
                        </div>
                    </el-col>

                    <!--Mio Akasako (2020)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Mio Akasako</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="mio"></a>
                        <div class="project col-md-12">
                            <p class=" col-md-3">
                                <span class="title">
                                Women in STEM
                                </span>
                                <br>
                                <span class="subtitle">
                                A Lesson in Perseverance
                                </span>
                            </p>
                            <br>
                            <vue-load-image>
                                <a href="https://miopio.github.io/thesis-play" target="_blank">
                                <img slot="image-mio" src="preview-2020/mio.png"/>
                                </a>
                            </vue-load-image>
                            <p class="col-md-9">
                                Exploring different facets of sexual misconduct, harassment, and discrimination in STEM academia...
                            </p>
                            <br>
                            <a id="github" href="https://github.com/miopio/thesis-play" target="_blank">[GitHub]</a>
                            <a id="download" href="https://github.com/miopio/thesis-play/raw/master/demo.mp4">[Download Video]</a>                             
                        </div>
                    </el-col>

                </el-row>

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--Saloni Naishad Shah (2020)-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Saloni Naishad Shah</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="saloni"></a>
                        <div class="project col-md-12">
                            <p class=" col-md-3">
                                <span class="title">
                                Are Forest Money or Mitigation?
                                </span>
                            </p>
                            <br>                                            
                            <vue-load-image>
                                <a href="https://parsons.nyc/thesis-2020/saloniNaishadShah" target="_blank">
                                <img slot="image-saloni" src="preview-2020/saloni.png"/>
                                </a>
                            </vue-load-image>

                            <p class="col-md-9">
                                Understanding the impact of carbon cap and trade markets on deforestation and emissions...
                            </p>
                            <br>
                            <a id="github" href="https://github.com/salonieshah/money-or-mitigation" target="_blank">[GitHub]</a>
                            <a id="download" href="https://github.com/salonieshah/money-or-mitigation/raw/master/demo.mp4">[Download Video]</a>                            
                        </div>
                    </el-col>
                    
                    <!--Michael Desai (2020)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Michael Desai</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="michael"></a>
                        <div class="project col-md-12">
                            <p class=" col-md-3">
                                <span class="title">
                                Visual Value
                                </span>
                            </p>
                            <br>
                            <vue-load-image>
                                <a href="https://parsons.nyc/thesis-2020/michaelDesai/" target="_blank">
                                <img slot="image-michael" src="preview-2020/michael.png"/>
                                </a>
                            </vue-load-image>
                            <p class="col-md-9">
                                A User Interface for Exploring Income Statements...
                            </p>
                            <br>
                            <a id="github" href="https://github.com/mi-desai/thesis" target="_blank">[GitHub]</a>
                            <a id="download" href="https://github.com/mi-desai/thesis/raw/master/demo.mp4">[Download Video]</a>                            
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

                    <!--Dan Ran (2020)-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Dan Ran</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="dan"></a>
                        <div class="project col-md-12">
                            <p class=" col-md-3">
                                <span class="title">
                                Shenzhen
                                </span>
                                <br>
                                <span class="subtitle">
                                The Growth and Livability of a Mega-city
                                </span>
                            </p>
                            <br>
                            <vue-load-image>
                                <a href="https://shuvitran.github.io/szapp/" target="_blank">
                                <img slot="image-danR" src="preview-2020/danR.png"/>
                                </a>
                            </vue-load-image>
                            <p class="col-md-9">
                                Shenzhen, known as China's booming silicon valley today, used to be a small fish town 40 years ago...
                            </p>
                            <br>
                            <a id="github" href="https://github.com/shuvitRan/ShenzhenLivability" target="_blank">[GitHub]</a>
                            <a id="download" href="https://github.com/shuvitRan/ShenzhenLivability/raw/master/demo.mp4">[Download Video]</a>                            
                        </div>
                    </el-col>

                    <!--Amanda Anderson-You (2020)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Amanda Anderson-You</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="amanda"></a>
                        <div class="project col-md-12">
                            <p class=" col-md-3">
                                <span class="title">
                                Climate & Sleep
                                </span>
                            </p>
                            <br>
                            <vue-load-image>
                                <a href="https://parsons.nyc/thesis-2020/amandaAnderson/" target="_blank">
                                <img slot="image-amanda" src="preview-2020/amanda.png"/>
                                </a>
                            </vue-load-image>
                            <p class="col-md-9">
                                Exploring the relationship between the climate crisis and sleep health...
                            </p>
                            <br>
                            <a id="github" href="https://github.com/amandersonyou/ClimateSleepThesis" target="_blank">[GitHub]</a>
                            <a id="download" href="https://github.com/amandersonyou/ClimateSleepThesis/raw/master/demo.mp4">[Download Video]</a>                          
                        </div>
                    </el-col>

                    <!--Yiran Ni (2020)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Yiran Ni</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="yiran"></a>
                        <div class="project col-md-12">
                            <p class=" col-md-3">
                                <span class="title">
                                Global Travel of Zoonotic Diseases.
                                </span>
                            </p>
                            <br>
                            <vue-load-image>
                                <a href="https://parsons.nyc/thesis-2020/yiranNi" target="_blank">
                                <img slot="image-yiran" src="preview-2020/yiran.png"/>
                                </a>
                            </vue-load-image>
                            <p class="col-md-9">
                                An analysis of how global wildlife trading is related to the zoonotic diseases...
                            </p>
                            <br>
                            <a id="github" href="https://github.com/yiranni/master-thesis" target="_blank">[GitHub]</a>
                            <a id="download" href="https://github.com/yiranni/master-thesis/raw/master/demo.mp4">[Download Video]</a>                           
                        </div>
                    </el-col>

                </el-row>

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--Nour Zein (2020)-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Nour Zein</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="nour"></a>
                        <div class="project col-md-12">
                            <p class=" col-md-3">
                                <span class="title">
                                Greening From the Rooftops
                                </span>
                            </p>
                            <br>
                            <vue-load-image>
                                <a href="https://green-roof-potential.herokuapp.com/" target="_blank">
                                <img slot="image-nour" src="preview-2020/nour.png"/>
                                </a>
                            </vue-load-image>
                            <p class="col-md-9">
                                A User Interface for Mapping New York City's Green Roof Potential...
                            </p>
                            <br>
                            <a id="github" href="https://github.com/nourzein/thesis" target="_blank">[GitHub]</a>
                            <a id="download" href="https://github.com/nourzein/thesis/raw/master/demo.mp4">[Download Video]</a>                              
                        </div>
                    </el-col>

                    <!--Zui Chen (2020)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Zui Chen</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="zui"></a>
                        <div class="project col-md-12">
                            <p class=" col-md-3">
                                <span class="title">
                                Unmasking Masks
                                </span>
                            </p>
                            <br>
                            <vue-load-image>
                                <a href="https://parsons.nyc/thesis-2020/zuiChen" target="_blank">
                                <img slot="image-zui" src="preview-2020/zui.png"/>
                                </a>
                            </vue-load-image>
                            <p class="col-md-9">
                                Uncovering global attitudes towards masks. Masks have recently become common objects in our daily life...
                            </p>
                            <br>
                            <a id="github" href="https://github.com/azuic/unmasking-masks" target="_blank">[GitHub]</a>
                            <a id="download" href="https://github.com/azuic/unmask-mask/raw/master/demo.mp4">[Download Video]</a>                                
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

                    <!--Neil Oliver (2020)-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Neil Oliver</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="neil"></a>
                        <div class="project col-md-12">
                            <p class=" col-md-3">
                                <span class="title">
                                Is Twitter Feeding Bitcoin?
                                </span>
                            </p>
                            <br>
                            <vue-load-image>
                                <a href="http://neiloliver.co/influence/" target="_blank">
                                <img slot="image-neil" src="preview-2020/neil.png"/>
                                </a>
                            </vue-load-image>
                            <p class="col-md-9">
                                An analysis of Twitter content, user behavior, and correlation to Bitcoin market value...
                            </p>
                            <br>
                            <a id="github" href="https://github.com/neil-oliver/thesis" target="_blank">[GitHub]</a>
                            <a id="github" href="https://github.com/neil-oliver/thesis/raw/master/demo.mp4">[Download Video]</a>                                
                        </div>
                    </el-col>

                    <!--Lulu Tanenbaum (2020)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Lulu Tanenbaum</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="lulu"></a>
                        <div class="project col-md-12">
                            <p class=" col-md-3">
                                <span class="title">
                                Your Brain on Political Media
                                </span>
                            </p>
                            <br>
                            <vue-load-image>
                                <a href="https://lulujordanna.github.io/thesis/" target="_blank">
                                <img slot="image-lulu" src="preview-2020/lulu.png"/>
                                </a>
                            </vue-load-image>
                            <p class="col-md-9">
                                Voting choices are made on more than just facts – emotion, bias and unconscious thought play an important...
                            </p>
                            <br>
                            <a id="github" href="https://github.com/lulujordanna/thesis" target="_blank">[GitHub]</a>
                            <a id="download" href="https://github.com/lulujordanna/thesis/raw/master/demo.mp4">[Download Video]</a>                                     
                        </div>
                    </el-col>

                    <!--Antonie Dreyer (2020)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Antonie Dreyer</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="antonie"></a>
                        <div class="project col-md-12">
                            <p class=" col-md-3">
                                <span class="title">
                                From NACA to NASA
                                </span>
                            </p>
                            <br>
                            <vue-load-image>
                                <a href="https://parsons.nyc/thesis-2020/antonieDreyer/" target="_blank">
                                <img slot="image-antonie" src="preview-2020/antonie.png"/>
                                </a>
                            </vue-load-image>
                            <p class="col-md-9">
                                Visualizing research paper metadata in the field of Aerospace Engineering for more efficient knowledge exploration, research and learning... 
                            </p>
                            <br>
                            <a id="github" href="https://github.com/acdreyer/thesis" target="_blank">[GitHub]</a>                             
                        </div>
                    </el-col>

                </el-row>

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--Janice Yamanaka-Lew (2020)-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Janice Yamanaka-Lew</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="janice"></a>
                        <div class="project col-md-12">
                            <p class=" col-md-3">
                                <span class="title">
                                Swamp Walk
                                </span>
                            </p>
                            <br>
                            <vue-load-image>
                                <a href="https://parsons.nyc/thesis-2020/janiceYamanakaLew/index.html" target="_blank">
                                <img slot="image-janice" src="preview-2020/janice.png"/>
                                </a>
                            </vue-load-image>                        
                            <p class="col-md-9">
                                Stepping into the Great Swamp Swamps have always been a source of terror and fascination but are actually valuable ecosystems...
                            </p>
                            <br>
                            <a id="github" href="https://github.com/jyamanaka/MajorStudio2" target="_blank">[GitHub]</a>
                            <a id="download" href="https://github.com/jyamanaka/MajorStudio2/raw/master/demo.mp4">[Download Video]</a>                             
                        </div>
                    </el-col>

                    <!--Brad MacDonald (2020)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Brad MacDonald</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="brad"></a>
                        <div class="project col-md-12">
                            <p class=" col-md-3">
                                <span class="title">
                                The Rona and Me
                                </span>
                            </p>
                            <br>
                            <vue-load-image>
                                <a href="https://emoji-epoch.glitch.me/" target="_blank">
                                <img slot="image-brad" src="preview-2020/brad.png"/>
                                </a>
                            </vue-load-image>                            
                            <p class="col-md-9">
                                An emoji-focused reflection on my experience with COVID-19 in an era of imposed digital connection...
                            </p>
                            <br>
                            <a id="github" href="https://github.com/daggus/EmojiEpoch/" target="_blank">[GitHub]</a>
                            <a id="download" href="https://github.com/daggus/EmojiEpoch//raw/master/demo.mp4">[Download Video]</a>                            
                        </div>
                    </el-col>

                </el-row>

                <!--SECTION-->

                <el-row :gutter="20">
                    <el-col :span="18" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <aside class="col-md-12 red">Food and Culture</aside>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <aside class="col-md-12">&nbsp;</aside>
                    </el-col>
                </el-row>

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--John Outwater (2020)-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">John Outwater</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="john"></a>
                        <div class="project col-md-12">
                            <p class=" col-md-3">
                                <span class="title">
                                Sensing Blue
                                </span>
                            </p>
                            <br>
                            <vue-load-image>
                                <a href="http://parsons.nyc/thesis-2020/johnOutwater/" target="_blank">
                                <img slot="image-john" src="preview-2020/john.png"/>
                                </a>
                            </vue-load-image>                         
                            <p class="col-md-9">
                                The role of flavor perception in modern blueberry breeding...
                            </p>
                            <br>
                            <a id="github" href="https://github.com/joutwater/jo_berry_code" target="_blank">[GitHub]</a>
                            <a id="download" href="https://github.com/joutwater/jo_berry_code/blob/master/demo.mp4?raw=true">[Download Video]</a>                               
                        </div>
                    </el-col>

                    <!--Caitlyn Ralph (2020)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Caitlyn Ralph</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="caitlyn"></a>
                        <div class="project col-md-12">
                            <p class=" col-md-3">
                                <span class="title">
                                Gut vs. Data
                                </span>
                                <br>
                                <span class="subtitle">
                                Mapping Career Arcs with Touring History in British Indie and Alternative Music
                                </span>
                            </p>
                            <br>
                            <vue-load-image>
                                <a href="https://caitlynmralph.github.io/thesis-app-sandbox/" target="_blank">
                                <img slot="image-caitlyn" src="preview-2020/caitlyn.png"/>
                                </a>
                            </vue-load-image>                         
                            <p class="col-md-9">
                                The aim of this thesis is to map touring histories to British indie and alternative career arcs in a post-streaming world, ultimately creating...
                            </p>
                            <br>
                            <a id="github" href="https://github.com/caitlynmralph/thesis-app-sandbox" target="_blank">[GitHub]</a>
                            <a id="download" href="https://github.com/caitlynmralph/thesis-app-sandbox/raw/master/demo.mp4">[Download Video]</a>                                
                        </div>
                    </el-col>

                    <!--Dan Grunebaum (2020)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Dan Grunebaum</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="daniel"></a>
                        <div class="project col-md-12">
                            <p class=" col-md-3">
                                <span class="title">
                                Turning Japanese
                                </span>
                            </p>
                            <br>
                            <vue-load-image>
                                <a href="http://parsons.nyc/thesis-2020/danGrunebaum/turning-japanese/" target="_blank">
                                <img slot="image-danG" src="preview-2020/danG.png"/>
                                </a>
                            </vue-load-image>                        
                            <p class="col-md-9">
                                The Globalization of Japanese Language and Concepts...
                            </p>
                            <br>
                            <a id="github" href="https://github.com/dangrunebaum/thesis" target="_blank">[GitHub]</a>
                            <a id="download" href="https://github.com/dangrunebaum/thesis/raw/master/demo.mp4">[Download Video]</a>                                 
                        </div>
                    </el-col>

                </el-row>

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--Xingwei Huang (2020)-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Xingwei Huang</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="xingwei"></a>
                        <div class="project col-md-12">
                            <p class=" col-md-3">
                                <span class="title">
                                A Guilty Pleasure
                                </span>
                            </p>
                            <br>
                            <vue-load-image>
                                <a href="https://parsons.nyc/thesis-2020/xingweiHuang/" target="_blank">
                                <img slot="image-xingwei" src="preview-2020/xingwei.png"/>
                                </a>
                            </vue-load-image>                        
                            <p class="col-md-9">
                                How Cocoa Production is Driving Deforestation in The Ivory Coast...
                            </p>
                            <br>
                            <a id="github" href="https://github.com/Xingwei726/MSthesis" target="_blank">[GitHub]</a>
                            <a id="download" href="https://github.com/Xingwei726/MSthesis/raw/master/demo.mp4">[Download Video]</a>                               
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
                
                    <!--MS Data Visualization 2020-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">

                        <div class="col-md-3">

                        <p><a href="http://www.newschool.edu/parsons/ms-data-visualization/" target="_blank">MS Data Visualization 2020</a></p>
                        <br />
                        <a href="https://github.com/miopio/thesis-play" target="_blank">Mio Akasako</a>
                        <br /> <a href="https://github.com/azuic/unmasking-masks" target="_blank">Zui Chen</a>
                        <br /> <a href="https://github.com/daggus/EmojiEpoch/" target="_blank">Brad MacDonald</a>
                        <br /> <a href="https://github.com/joutwater/jo_berry_code" target="_blank">John Outwater</a>
                        <br /> <a href="https://github.com/caitlynmralph/thesis-app-sandbox" target="_blank">Caitlyn Ralph</a>
                        <br /> <a href="https://github.com/shuvitRan/ShenzhenLivability" target="_blank">Dan Ran</a>
                        <br /> <a href="https://github.com/jyamanaka/MajorStudio2" target="_blank">Janice Yamanaka-Lew</a>
                        <br /> <a href="https://github.com/amandersonyou/ClimateSleepThesis" target="_blank">Amanda Anderson-You</a>
                        <br /> <a href="https://github.com/marisaruizasari/thesis" target="_blank">Marisa Ruiz Asari</a>
                        <br /> <a href="https://github.com/robincoenen/thesis_production" target="_blank">Robin Coenen</a>
                        <br /> <a href="https://github.com/mi-desai/thesis" target="_blank">Michael Desai</a>
                        <br /> <a href="https://github.com/acdreyer/thesis" target="_blank">Antonie Dreyer</a>
                        <br /> <a href="https://github.com/dangrunebaum/thesis" target="_blank">Dan Grunebaum</a>
                        <br /> <a href="https://github.com/Xingwei726/MSthesis" target="_blank">Xingwei Huang</a>
                        <br /> <a href="https://github.com/yiranni/master-thesis" target="_blank">Yiran Ni</a>
                        <br /> <a href="https://github.com/neil-oliver/thesis" target="_blank">Neil Oliver</a>
                        <br /> <a href="https://github.com/salonieshah/money-or-mitigation" target="_blank">Saloni Naishad Shah</a>
                        <br /> <a href="https://github.com/lulujordanna/thesis" target="_blank">Lulu Tanenbaum</a>
                        <br /> <a href="https://github.com/nourzein/thesis" target="_blank">Nour Zein</a>

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
