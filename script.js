new Vue({
  el: '#app',
  data: function () {
    return {
      filter: '',
      sort: '',
      options: [
      { label: 'Default (Student Name A-Z)', value: 'none' },
      { label: 'Latest ', value: 'latest' },
      { label: 'Earliest ', value: 'earliest' }],
      students: [],
      scTimer: 0,
      scY: 0,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll: function () {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
  },
  computed: {
    getStudents() {

      var students = this.students.filter(student => {
        return student.name.toLowerCase().includes(this.filter.toLowerCase()) || 
        student.title.toLowerCase().includes(this.filter.toLowerCase()) || 
        student.year.toLowerCase().includes(this.filter.toLowerCase()) || 
        student.hashtag_1.toLowerCase().includes(this.filter.toLowerCase()) || 
        student.hashtag_2.toLowerCase().includes(this.filter.toLowerCase())
      });

      if (this.sort == 'latest') {
        return students.sort(function (a, b) {
          return b.year - a.year;
        });
      } else if (this.sort == 'earliest') {
        return students.sort(function (a, b) {
          return a.year-b.year;
        });
      } else {
        return students;
      }
      
    }
  },
  mounted() {
    fetch('./json/project.json')
      .then(res => res.json())
      .then(studentList => {this.students = studentList});
  } 
});