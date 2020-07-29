<template>
    <el-container>
        <el-main>
            <div>
            <div id="cover">
                <iframe height="100%" width="100%" src="http://events.newschool.edu/event/data_visualization_keynotes"></iframe>
                <!-- <img src=""> -->
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

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--Barbara Compagnoni (2016)-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Barbara Compagnoni</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                    
                        <a id="barbaraCompagnoni"></a>
                        <div
                        github-src="https://github.com/compagnb"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Feeling.it
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2016/barbaraCompagnoni/" target="_blank">
                            <img slot="image-barbaraCompagnoni" src="preview-2016/barbaraCompagnoni.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            How our bodies interpret data is the result of our brain processing the environment around us through our senses. The data collected from...
                        </p> 
                        </div>
                    </el-col>

                    <!--Justine Keller (2016)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Justine Keller</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="justineKeller"></a>
                        <div
                        github-src="https://github.com/Justinerk2"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Leadership Gender Gap
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2016/justineKeller/" target="_blank">
                            <img slot="image-justineKeller" src="preview-2016/justineKeller.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            While 92% of girls believe anyone can acquire the skills of leadership, only 21% believe they currently have most of the key qualities required...
                        </p>
                        </div>
                    </el-col>

                    <!--Linnea Lapp (2016)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Linnea Lapp</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="linneaLapp"></a>
                        <div
                        github-src="https://github.com/llapp"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Patterns of Vulnerability
                            </span>
                            <br>
                            <span class="subtitle">
                            Visualizing Northern Canadian Food Insecurity
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2016/linneaLapp/" target="_blank">
                            <img slot="image-linneaLapp" src="preview-2016/linneaLapp.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            Although Canada has no official measure of poverty, food insecurity (the financial and/or physical inability to access adequate food) is present...
                        </p>
                        </div>
                    </el-col>

                </el-row>

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--Jacob Romer (2016)-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Jacob Romer</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                    
                        <a id="jacobRomer"></a>
                        <div
                        github-src="https://github.com/jacobmbr"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Glimpse
                            </span>
                            <br>
                            <span class="subtitle">
                            You Can Only Know What You See, You Can Only Act On What You Know
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="http://parsons.nyc/thesis-2016/jacobRomer/" target="_blank">
                            <img slot="image-jacobRomer" src="preview-2016/jacobRomer.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            Glimpse is a Chrome extension that reveals the network of entities that watch you on the web, across time, and across space. It shows you...
                        </p> 
                        </div>
                    </el-col>

                    <!--Gabi Steele (2016)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Gabi Steele</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="gabiSteele"></a>
                        <div
                        github-src="https://github.com/gabisteele"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Visualizing the Group Attachment Based Intervention
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2016/gabiSteele/" target="_blank">
                            <img slot="image-gabiSteele" src="preview-2016/gabiSteele.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            This project was fueled by the notion that the majority of data shared within the Social Science community—specifically the field of Child...
                        </p>
                        </div>
                    </el-col>

                    <!--Jaime Tanner (2016)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Jaime Tanner</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="jaimeTanner"></a>
                        <div
                        github-src="https://github.com/jat3002"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Taxonomic Bias
                            </span>
                            <br>
                            <span class="subtitle">
                            In Scientific Research & Funding
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2016/jaimeTanner/project.html" target="_blank">
                            <img slot="image-jaimeTanner" src="preview-2016/jaimeTanner.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            World species are declining at relatively high rates. Researchers in the fields of ecology, conservation biology, and related areas of study...
                        </p>
                        </div>
                    </el-col>

                </el-row>                

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--Jon Thirkield (2016)-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Jon Thirkield</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                    
                        <a id="jonThirkield"></a>
                        <div
                        github-src="https://github.com/jthirkield"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Visualizing Poetic Space
                            </span>
                            <br>
                            <span class="subtitle">
                            Mapping Dante’s Comedy
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2016/jonThirkield/" target="_blank">
                            <img slot="image-jonThirkield" src="preview-2016/jonThirkield.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            Written in the early 1300s, The Divine Comedy stands at the threshold of the Medieval and the Renaissance ages. Both its grand...
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
                
                    <!--MS Data Visualization 2016-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">

                        <div class="col-md-3">

                        <p><a href="http://www.newschool.edu/parsons/ms-data-visualization/" target="_blank">MS Data Visualization 2016</a></p>
                        <br />
                        <a href="https://github.com/compagnb">Barbara Compagnoni</a>
                        <br /> <a href="https://github.com/Justinerk2" class="no-touch">Justine Keller</a>
                        <br /> <a href="https://github.com/llapp">Linnea Lapp</a>
                        <br /> <a href="https://github.com/jacobmbr">Jacob Romer</a>
                        <br /> <a href="https://github.com/gabisteele">Gabi Steele</a>
                        <br /> <a href="https://github.com/jat3002">Jaime Tanner</a>
                        <br /> <a href="https://github.com/jthirkield">Jon Thirkield</a>

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
