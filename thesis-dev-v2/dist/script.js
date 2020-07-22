new Vue({
  el: '#app',
  data: function () {
    return {
      filter: '',
      sort: '',
      options: [
      { label: 'Default (Student Name A-Z)', value: 'none' },
      { label: 'Most Recent', value: 'year' }],

      students: [
        { name: 'Aaditi Rokade', title: 'Visualizing the Impact of Climate Change', year: 2019, previews: '../static/preview-2019/aaditi.png', intro: 'This visualization explores the trends in flight cancellations and passenger...', hashtag: '#DataAndPolicy' },
      { name: 'Alonso Alcocer Guemez', title: '2016: A Year in News', year: 2019, previews: '../static/preview-2019/alonso.png', intro: 'The following visual essay explores the behavior of the U.S. media at a...', hashtag: '#MediaAndSociety' },
      { name: 'Amanda Anderson-You', title: 'Climate & Sleep', year: 2020, previews: '../static/preview-2020/amanda.png', intro: 'Exploring the relationship between the climate crisis and sleep health...', hashtag: '#HealthAndLivelihood' },
      { name: 'Andrew Levinson', title: 'The United States Water Crisis', year: 2019, previews: '../static/preview-2019/andrew.png', intro: 'Freshwater has been described as the oil of the 21st century. In the wake of...', hashtag: '#DataAndPolicy' },
      { name: 'Antonie Dreyer', title: 'From NACA to NASA', year: 2020, previews: '../static/preview-2020/antonie.png', intro: 'Visualizing research paper metadata in the field of Aerospace Engineering for...', hashtag: '#MediaAndSociety' },
      { name: 'Aseem Agarwal', title: 'How is Delhi Slowing Down?', year: 2017, previews: '../static/preview-2017/aseem.png', intro: 'Congestion on roads in urban cities is a common phenomenon and also...', hashtag: '#DataAndPolicy' },
      { name: 'Aucher Serr', title: 'Exploring the Potential of Green Roofs', year: 2018, previews: '../static/preview-2018/aucher.png', intro: 'This thesis explores the ways in which green roofs can be used to counteract...', hashtag: '#LandscapesAndPathways' },
      { name: 'Barbara Compagnoni', title: 'Feeling.it', year: 2016, previews: '../static/preview-2016/barbara.png', intro: 'How our bodies interpret data is the result of our brain processing the...', hashtag: '#DataAndTechnology' },
      { name: 'Batool Akbar', title: 'Understand Your Blood, Your Data', year: 2019, previews: '../static/preview-2019/batool.png', intro: 'Blood is a fascinating component of the human body. With only a few drops of...', hashtag: '#HealthAndLivelihood' },
      { name: 'Benzamin Yi', title: 'The Los Angeles Riots 1992', year: 2018, previews: '../static/preview-2018/benzamin.png', intro: 'The Los Angeles Riots of 1992 has a personal story to me that I only realized...', hashtag: '#SocietyAndPolitics' },
      { name: 'Brad MacDonald', title: 'The Rona and Me', year: 2020, previews: '../static/preview-2020/brad.png', intro: 'An emoji-focused reflection on my experience with COVID-19 in an era...', hashtag: '#MediaAndSociety' },
      { name: 'Caitlyn Ralph', title: 'Gut vs. Data', year: 2020, previews: '../static/preview-2020/caitlyn.png', intro: 'The aim of this thesis is to map touring histories to British indie and alternative...', hashtag: '#FoodAndCulture' },
      { name: 'Candice Joan Mai Chan', title: 'Opioids', year: 2019, previews: '../static/preview-2019/candice.png', intro: 'Over the past two decades, the branding and commercialization of opioids has...', hashtag: '#HealthAndLivelihood' },
      { name: 'Clare Churchouse', title: 'Do museums reflect who we are?', year: 2019, previews: '../static/preview-2019/clare.png', intro: 'Art museums are institutions that collect, curate, and exhibit works of art for the...', hashtag: '#ArtsAndLeisure' },
      { name: 'Colleen McCaffrey', title: 'The Sum of Us', year: 2019, previews: '../static/preview-2019/colleen.png', intro: 'Using a hybrid approach of structured and unstructured learning, and the...', hashtag: '#HealthAndLivelihood' },
      { name: 'Dan Grunebaum', title: 'Turning Japanese', year: 2020, previews: '../static/preview-2020/danG.png', intro: 'The Globalization of Japanese Language and Concepts...', hashtag: '#FoodAndCulture' },
      { name: 'Dan Ran', title: 'Shenzhen', year: 2020, previews: '../static/preview-2020/danR.png', intro: 'Livability of a Mega-cityShenzhen, known as China‘s booming silicon valley today...', hashtag: '#HealthAndLivelihood' },
      { name: 'Elena Paunova', title: 'Nice To Meet You', year: 2018, previews: '../static/preview-2018/elena.png', intro: 'Nice to meet you is about measuring ethnic, linguistic, religious, and cultural...', hashtag: '#SocietyAndPolitics' },
      { name: 'Ellie Frymire', title: 'An Exploration of the Movement #metoo', year: 2018, previews: '../static/preview-2018/ellie.png', intro: 'Following the wake of several women coming forward against Harvey...', hashtag: '#LanguageAndUnderstanding' },
      { name: 'Emily Chu', title: 'Notes on Perspective', year: 2019, previews: '../static/preview-2019/emily.png', intro: 'Notes on Perspective experiments with making visually tangible and beautiful...', hashtag: '#ArtsAndLeisure' },
      { name: 'Felix Buchholz', title: 'Universal Income Guarantees', year: 2019, previews: '../static/preview-2019/felix.gif', intro: 'In a climate of polarization, a peculiar idea might have the potential to reach...', hashtag: '#HealthAndLivelihood' },
      { name: 'Flávio Pessoa Sant‘Anna', title: 'CS Education and Computational Trends', year: 2018, previews: '../static/preview-2018/flavio.png', intro: 'Teaching children how to code is a common goal in education in the US...', hashtag: '#LanguageAndUnderstanding' },
      { name: 'Gabi Steele', title: 'The Group Attachment Based Intervention', year: 2016, previews: '../static/preview-2016/gabi.png', intro: 'This project was fueled by the notion that the majority of data shared within the...', hashtag: '#DataAndPolicy' },
      { name: 'George Sieniawski', title: 'Strength in Numbers', year: 2018, previews: '../static/preview-2018/george.png', intro: 'Global seapower competition is intensifying. As China dredges up...', hashtag: '#LandscapesAndPathways' },
      { name: 'Grace Martinez', title: 'Self-Storage Nation', year: 2019, previews: '../static/preview-2019/grace.png', intro: 'Catering to America’s material overflow, the self-storage industry has exploded...', hashtag: '#DataAndPolicy' },
      { name: 'Ian Smith', title: 'Lincmap', year: 2017, previews: '../static/preview-2017/ian.png', intro: 'This project attempts to provide a data visualization tool for qualitative analysis...', hashtag: '#LanguageAndUnderstanding' },
      { name: 'Isabel Verkes', title: 'Passive Activism', year: 2019, previews: '../static/preview-2019/isabel.png', intro: 'The increase in passively invested money, index funds, is affecting the relationship...', hashtag: '#MediaAndSociety' },
      { name: 'Jacob Romer', title: 'Glimpse', year: 2016, previews: '../static/preview-2016/jacob.png', intro: 'Glimpse is a Chrome extension that reveals the network of entities that...', hashtag: '#DataAndTechnology' },
      { name: 'Jaime Tanner', title: 'Taxonomic Bias', year: 2016, previews: '../static/preview-2016/jaime.png', intro: 'World species are declining at relatively high rates. Researchers in the fields of...', hashtag: '#HealthAndLivelihood' },
      { name: 'Janice Yamanaka-Lew', title: 'Swamp Walk', year: 2020, previews: '../static/preview-2020/janice.png', intro: 'Stepping into the Great Swamp Swamps have always been a source of terror...', hashtag: '#MediaAndSociety' },
      { name: 'Jed Crocker', title: 'Visually Exploring the American Archive', year: 2019, previews: '../static/preview-2019/jed.png', intro: 'The American Archive of Public Broadcasting is a collaboration between...', hashtag: '#MediaAndSociety' },
      { name: 'Joe Steele', title: 'Moving the Line', year: 2018, previews: '../static/preview-2018/joe.png', intro: 'In the 1930‘s, the Home Owner’s Loan Corporation was conceived with the...', hashtag: '#LandscapesAndPathways' },
      { name: 'John Outwater', title: 'Sensing Blue', year: 2020, previews: '../static/preview-2020/john.png', intro: 'The role of flavor perception in modern blueberry breeding...', hashtag: '#FoodAndCulture' },
      { name: 'Jonathan Thirkield', title: 'Visualizing Poetic Space', year: 2016, previews: '../static/preview-2016/jonathan.png', intro: 'Written in the early 1300s, The Divine Comedy stands at the threshold of the...', hashtag: '#ArtsAndLeisure' },
      { name: 'Joshua Lee', title: 'Player Interactions in Online Games', year: 2017, previews: '../static/preview-2017/joshua.png', intro: 'This thesis attempts to explore the activity of players in a Massive...', hashtag: '#CompetitionAndPlay' },
      { name: 'Julian Lange', title: 'On and Beyond the Edge', year: 2018, previews: '../static/preview-2018/julian.png', intro: 'Olympic Games and World Championships showcase the world’s...', hashtag: '#CompetitionAndPlay' },
      { name: 'Justine Keller', title: 'Leadership Gender Gap', year: 2016, previews: '../static/preview-2016/justine.png', intro: 'While 92% of girls believe anyone can acquire the skills of leadership, only...', hashtag: '#SocietyAndPolitics' },
      { name: 'Kevin Lee', title: 'What Movies Are Selling You', year: 2018, previews: '../static/preview-2018/kevin.png', intro: 'A look at product placement in popular movies, the brands being marketed to...', hashtag: '#CompetitionAndPlay' },
      { name: 'Kiril Traykov', title: 'Travel in Women’s Professional Tennis', year: 2019, previews: '../static/preview-2019/kiril.png', intro: 'Tennis is unique from other sports with the fact that there are no "home...', hashtag: '#ArtsAndLeisure' },
      { name: 'Linnea Lapp', title: 'Patterns of Vulnerability', year: 2016, previews: '../static/preview-2016/linnea.png', intro: 'Although Canada has no official measure of poverty, food insecurity (the financial...', hashtag: '#HealthAndLivelihood' },
      { name: 'Lulu Tanenbaum', title: 'Your Brain on Political Media', year: 2020, previews: '../static/preview-2020/lulu.png', intro: 'Voting choices are made on more than just facts – emotion, bias and...', hashtag: '#MediaAndSociety' },
      { name: 'Marisa Ruiz Asari', title: 'Weapons of Mass Injustice', year: 2020, previews: '../static/preview-2020/marisa.png', intro: 'Visualizing the unequal impacts of gun violence and the search for peace in...', hashtag: '#DataAndPolicy' },
      { name: 'Max Carradine', title: 'The Influencers', year: 2018, previews: '../static/preview-2018/max.png', intro: 'Every two years we witness an unconscionable amount of money...', hashtag: '#SocietyAndPolitics' },
      { name: 'Michael Desai', title: 'Visual Value', year: 2020, previews: '../static/preview-2020/michael.png', intro: 'A User Interface for Exploring Income Statements...', hashtag: '#DataAndPolicy' },
      { name: 'Michael Wolf', title: 'How Fragile is the Sahel?', year: 2019, previews: '../static/preview-2019/michael.gif', intro: 'The Sahel region in northern Africa is a place where the member countries are...', hashtag: '#DataAndPolicy' },
      { name: 'Michal Bacon', title: 'Escaping Social Dilemmas', year: 2018, previews: '../static/preview-2018/michal.png', intro: 'In game theory, social dilemmas are situations where the interests of the...', hashtag: '#CompetitionAndPlay' },
      { name: 'Mikaela Ergas Lenett', title: 'From the Supreme Court to the States', year: 2019, previews: '../static/preview-2019/mikaela.png', intro: 'Throughout history, both the Supreme Court and lower levels of government...', hashtag: '#HealthAndLivelihood' },
      { name: 'Mio Akasako', title: 'Women in STEM', year: 2020, previews: '../static/preview-2020/mio.png', intro: 'Exploring different facets of sexual misconduct, harassment, and...', hashtag: '#DataAndPolicy' },
      { name: 'Nancy Zhao', title: 'The Afterlife of Broadway Musicals', year: 2017, previews: '../static/preview-2017/nancy.png', intro: 'Broadway musical theatre is not a ephemeral and New York local...', hashtag: '#ArtsAndLeisure' },
      { name: 'Neil Oliver', title: 'Is Twitter Feeding Bitcoin?', year: 2020, previews: '../static/preview-2020/neil.png', intro: 'An analysis of Twitter content, user behavior, and correlation to Bitcoin...', hashtag: '#MediaAndSociety' },
      { name: 'Nic Stark', title: 'Cambrian Analytica', year: 2019, previews: '../static/preview-2019/nic.png', intro: 'Cambrian Analytica is a speculative design project that aims to answer the...', hashtag: '#ArtsAndLeisure' },
      { name: 'Nour Zein', title: 'Greening From the Rooftops', year: 2020, previews: '../static/preview-2020/nour.png', intro: 'A User Interface for Mapping New York City‘s Green Roof Potential...', hashtag: '#HealthAndLivelihood' },
      { name: 'PJ Moriarty', title: 'Wave9', year: 2017, previews: '../static/preview-2017/pj.png', intro: 'Commonly, numerical values expressed in multiple orders of magnitude are...', hashtag: '#LandscapesAndPathways' },
      { name: 'Rik Ghosh', title: 'A Century of American Food', year: 2018, previews: '../static/preview-2018/rik.png', intro: 'Americans are thought to be fond of following fad diets, paradigms of eating...', hashtag: '#FoodAndAgriculture' },
      { name: 'Riley Hoonan', title: 'Mapping Dada', year: 2017, previews: '../static/preview-2017/riley.png', intro: 'How do we measure influence? If you allow that a link from one page to...', hashtag: '#ArtsAndLeisure' },
      { name: 'Robin Coenen', title: 'With Compliments to the Secretary General', year: 2020, previews: '../static/preview-2020/robin.png', intro: 'Visualizing Maritime Claims at the UN in regard to the Continental Shelf...', hashtag: '#DataAndPolicy' },
      { name: 'Ryan Best', title: 'Drawing Discrimination', year: 2019, previews: '../static/preview-2019/ryan.png', intro: 'This visualization explores redlining and discriminatory federal New Deal...', hashtag: '#DataAndPolicy' },
      { name: 'Rye Zupancis', title: 'Vegetation and Socioeconomic Shifts', year: 2018, previews: '../static/preview-2018/rye.png', intro: 'Vegetation indices derived from satellite flyover data tend to correlate with GDP...', hashtag: '#FoodAndAgriculture' },
      { name: 'Saloni Naishad Shah', title: 'Are Forest Money or Mitigation?', year: 2020, previews: '../static/preview-2020/saloni.png', intro: 'Understanding the impact of carbon cap and trade markets on deforestation and...', hashtag: '#DataAndPolicy' },
      { name: 'Sambhav Jain', title: 'Visualizing Law', year: 2017, previews: '../static/preview-2017/sambhav.png', intro: 'This thesis is about the visual exploration of the current sex offender registration...', hashtag: '#DataAndPolicy' },
      { name: 'Sam Vickars', title: 'Canada‘s Indian Residential School System', year: 2017, previews: '../static/preview-2017/sam.png', intro: 'Canada‘s Indian Residential School System was a network of boarding...', hashtag: '#SocietyAndPolitics' },
      { name: 'Simone Rachelle Betito', title: 'Repatriation', year: 2019, previews: '../static/preview-2019/simone.png', intro: 'Museums are bastions of culture, they hold artifacts from all over the world...', hashtag: '#HealthAndLivelihood' },
      { name: 'Stephanie Yung', title: 'All the Queens Voices', year: 2019, previews: '../static/preview-2019/stephanie.png', intro: 'Museums are bastions of culture, they hold artifacts from all over the world...', hashtag: '#MediaAndSociety' },
      { name: 'Steven Hubbard', title: 'Patterns of Professional Identity in STEM', year: 2018, previews: '../static/preview-2018/steven.png', intro: 'Students perform better in the classroom when their teachers are proficient in...', hashtag: '#LanguageAndUnderstanding' },
      { name: 'Suzanna Schmeelk', title: 'Identity Theft', year: 2019, previews: '../static/preview-2019/suzanna.png', intro: 'This thesis examines identity theft through the lens of medical record data...', hashtag: '#MediaAndSociety' },
      { name: 'Will Su', title: 'Refugee-Flow', year: 2018, previews: '../static/preview-2018/will.gif', intro: 'To date, there were an unprecedented 65.6 million forcibly displaced people...', hashtag: '#LandscapesAndPathways' },
      { name: 'Xingwei Huang', title: 'A Guilty Pleasure', year: 2020, previews: '../static/preview-2020/xingwei.png', intro: 'How Cocoa Production is Driving Deforestation in The Ivory Coast...', hashtag: '#FoodAndCulture' },
      { name: 'Yicen Shi', title: 'Bacteria Invasion', year: 2018, previews: '../static/preview-2018/yicen.png', intro: 'Food safety is essential to civilizations. Consumption of bacteria contaminated...', hashtag: '#FoodAndCulture' },
      { name: 'Yiran Ni', title: 'Global Travel of Zoonotic Diseases', year: 2020, previews: '../static/preview-2020/yiran.png', intro: 'An analysis of how global wildlife trading is related to the zoonotic diseases...', hashtag: '#HealthAndLivelihood' },
      { name: 'Zui Chen', title: 'Unmasking Masks', year: 2020, previews: '../static/preview-2020/zui.png', intro: 'Uncovering global attitudes towards masks. Masks have recently become...', hashtag: '#HealthAndLivelihood' }] 
    };
  },
  computed: {
    getStudents() {

      var students = this.students.filter(student => {
        return student.name.toLowerCase().includes(this.filter.toLowerCase()) || 
        student.title.toLowerCase().includes(this.filter.toLowerCase());
      });

      if (this.sort == 'year') {
        return students.sort(function (a, b) {
          return b.year - a.year;
        });
      } else {
        return students;
      }
    } 
  } 
});