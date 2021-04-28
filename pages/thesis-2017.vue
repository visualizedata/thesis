<template>
    <el-container>
        <el-main>
            <div>
            <div id="cover">
                <iframe height="100%" width="100%" src="http://events.newschool.edu/event/data_visualization_keynotes"></iframe>
                <img src="./img/cover-2017.png">
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

                    <!--Sam Vickars (2017)-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Sam Vickars</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                    
                        <a id="samVickars"></a>
                        <div
                        github-src="https://github.com/svickars/thesis"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Visualizing Canada's Indian Residential School System
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2017/samVickars/" target="_blank">
                            <img slot="image-samVickars" src="preview-2017/samVickars.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            Canada's Indian Residential School System was a network of boarding schools, industrial schools, and federal hostels created to remove...
                        </p> 
                        </div>
                    </el-col>

                    <!--Aseem Agarwal (2017)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Aseem Agarwal</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="aseemAgarwal"></a>
                        <div
                        github-src="https://github.com/agaase/msdv-thesis"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            How is Delhi Slowing Down?
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="http://parsons.nyc/thesis-2017/aseemAgarwal/" target="_blank">
                            <img slot="image-aseemAgarwal" src="preview-2017/aseemAgarwal.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            Congestion on roads in urban cities is a common phenomenon and also regarded sometimes as the hallmark of vibrant business districts...
                        </p>
                        </div>
                    </el-col>

                    <!--Nancy Zhao (2017)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Nancy Zhao</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="nancyZhao"></a>
                        <div
                        github-src="https://github.com/nancyzhao888/thesis"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            The International Afterlife of Broadway Musicals
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="http://parsons.nyc/thesis-2017/nancyZhao/" target="_blank">
                            <img slot="image-nancyZhao" src="preview-2017/nancyZhao.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            Broadway musical theatre is not a ephemeral and New York local phenomenon. It is a powerful brand, and a form of cultural export...
                        </p>
                        </div>
                    </el-col>

                </el-row>

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--Sambhav Jain (2017)-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Sambhav Jain</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                    
                        <a id="sambhavJain"></a>
                        <div
                        github-src="https://github.com/jainsambhav91/thesis"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Visualizing Law
                            </span>
                            <br>
                            <span class="subtitle">
                            Understanding the Sex Offender Registry Laws and Their Collateral Consequences
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="http://parsons.nyc/thesis-2017/sambhavJain/" target="_blank">
                            <img slot="image-sambhavJain" src="preview-2017/sambhavJain.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            This thesis is about the visual exploration of the current sex offender registration and community notification laws in the United...
                        </p> 
                        </div>
                    </el-col>

                    <!--Ian Smith (2017)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Ian Smith</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="ianSmith"></a>
                        <div
                        github-src="https://github.com/Ianssmith/thesis"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Lincmap
                            </span>
                            <br>
                            <span class="subtitle">
                            Using Modern Computation and Data Analysis to Provide a More Unbiased and Scalable Research Tool for People to Plan or Choose a Career Path
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="http://parsons.nyc/thesis-2017/ianSmith/" target="_blank">
                            <img slot="image-ianSmith" src="preview-2017/ianSmith.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            This project attempts to provide a data visualization tool for qualitative analysis of career history data at a large scale using automation and...
                        </p>
                        </div>
                    </el-col>

                    <!--PJ Moriarty (2017)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">PJ Moriarty</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="pjMoriarty"></a>
                        <div
                        github-src="https://github.com/moriartp/ms2"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Wave9
                            </span>
                            <br>
                            <span class="subtitle">
                            An Immersive Augmented Reality Model of the Solar System
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2017/pjMoriarty/index.html" target="_blank">
                            <img slot="image-pjMoriarty" src="preview-2017/pjMoriarty.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            Commonly, numerical values expressed in multiple orders of magnitude are difficult to comprehend, particularly so for...
                        </p>
                        </div>
                    </el-col>

                </el-row>                

                <!--PROJECT-->

                <el-row :gutter="20">

                    <!--Joshua Lee (2017)-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Joshua Lee</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                    
                        <a id="joshuaLee"></a>
                        <div
                        github-src="https://github.com/neuralism/thesis"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            VVisualizing Player Interactions in Online Games
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="https://parsons.nyc/thesis-2017/joshuaLee/" target="_blank">
                            <img slot="image-joshuaLee" src="preview-2017/joshuaLee.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            This thesis attempts to explore the activity of players in a Massive Multiplayer Online Role Playing Game (MMORPG) by visualizing the...
                        </p> 
                        </div>
                    </el-col>

                    <!--Riley Hoonan (2017)-->
                    <el-col :span="6" :xs="{span: 24, offset: 0}">
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>
                        <h3 class="col-md-12">Riley Hoonan</h3>
                        <div class="bottom-stripe col-md-12">
                        <div class="bottom-stripe-inner"></div>
                        </div>

                        <a id="rileyHoonan"></a>
                        <div
                        github-src="https://github.com/rhoon/thesis"
                        class="project col-md-12">
                        <p class=" col-md-3">
                            <span class="title">
                            Mapping Dada
                            </span>
                        </p>
                        <br>
                        <vue-load-image>
                            <a href="http://www.mappingdada.info/" target="_blank">
                            <img slot="image-rileyHoonan" src="preview-2017/rileyHoonan.png"/>
                            </a>
                        </vue-load-image>
                        <p class="col-md-9">
                            How do we measure influence? If you allow that a link from one page to another allows us to measure relevance, ala the PageRankU+2122...
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
                
                    <!--MS Data Visualization 2017-->
                    <el-col :span="6" :offset="3" :xs="{span: 24, offset: 0}">

                        <div class="col-md-3">

                        <p><a href="http://www.newschool.edu/parsons/ms-data-visualization/" target="_blank">MS Data Visualization 2017</a></p>
                        <br />
                        <a href="https://github.com/svickars/thesis">Sam Vickars</a>
                        <br /> <a href="https://github.com/agaase/msdv-thesis">Aseem Agarwal</a>
                        <br /> <a href="https://github.com/nancyzhao888/thesis">Nancy Zhao</a>
                        <br /> <a href="https://github.com/jainsambhav91/thesis">Sambhav Jain</a>
                        <br /> <a href="https://github.com/Ianssmith/thesis">Ian Smith</a>
                        <br /> <a href="https://github.com/moriartp/ms2">PJ Moriarty</a>
                        <br /> <a href="https://github.com/neuralism/thesis">Joshua Lee</a>
                        <br /> <a href="https://github.com/rhoon/thesis">Riley Hoonan</a>

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
