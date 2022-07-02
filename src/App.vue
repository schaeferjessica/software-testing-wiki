<template>
  <header class="software-testing__header">
    <h1 class="software-testing__heading software-testing__heading--hidden">software testing wiki</h1>
  </header>

  <main class="software-testing__main">
      <div class="software-testing__grid">
        <h2 class="software-testing__title">QA Table of Content</h2>

        <div class="software-testing__inner" v-for="group in groups" :key="group.title">
          <ol class="software-testing__list">
            <li class="software-testing__list-item" v-for="item in group.tableOfContentsCollection.items" :key="item.title">
              <button class="software-testing__link-hover">{{item.title}}</button>
              <button class="software-testing__tooptip-button" v-if="item.tooltip">
                <span class="software-testing__tooptip-icon">i</span>
              </button>
              <span class="software-testing__tooptip-text" v-if="item.tooltip">{{item.tooltip}}</span>
            </li>
          </ol>
        </div>

        <button class="software-testing__link-hover">tooptip test</button>
        <button class="software-testing__tooptip-button">
          <span class="software-testing__tooptip-icon">i</span>
        </button>
      </div>

      <div class="software-testing__grid">
        <h2 class="software-testing__title">QA Checklist</h2>

        <div class="software-testing__inner software-testing__inner--fixed">
          <div v-for="checkboxGroup in checkboxGroups" :key="checkboxGroup.title">
            <h3>{{checkboxGroup.title}}</h3>

              <ol class="software-testing__list software-testing__list--none">
                <li class="software-testing__list-item" v-for="checkbox in checkboxGroup.checkboxesCollection.items" :key="checkbox.title">
                  <button class="software-testing__link-hover">{{checkbox.title}}</button>
                  <span class="software-testing__tooptip" v-if="checkbox.tooltip">{{checkbox.tooltip}}</span>
                </li>
              </ol>
          </div>
        </div>
      </div>
      
      <div class="software-testing__grid">
        <div class="linklist__inner">
        <h2 class="software-testing__title">QA Linklist</h2>

        <div class="software-testing__inner">
          <div class="software-testing__textfield">
            <h3>Tools for Testing</h3>
            <a href="#" class="software-testing__extern software-testing__link-hover">Google Devs - ARIA Labels</a>
          </div>
        </div>

        <!-- <div class="software-testing__inner" v-for="checkboxGroup in checkboxGroups" :key="checkboxGroup.title">
          <ul class="software-testing__list">
            <li class="software-testing__list-item" v-for="checkbox in checkboxGroup.checkboxesCollection.items" :key="checkbox.title">
              {{checkbox.title}}
              <span class="software-testing__tooptip" v-if="checkbox.text">{{checkbox.text}}</span>
            </li>
          </ul>
        </div> -->
        </div>
      </div>

      <div class="software-testing__message">
        <p class="software-testing__message-text">Please view this page on a minimum Screen size  of, 1000px</p>
        <button class="software-testing__message-button software-testing__link-hover">Enable Full Screen</button>
      </div>
  </main>

  <footer class="software-testing__footer">
    <a href="https://github.com/schaeferjessica/software-testing-wiki" class="software-testing__link-hover">repo</a>
  </footer>
</template>

<script>

const fetchData = async query => {
  const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${import.meta.env.VITE_APP_CONTENTFUL_SPACE_ID}`;
  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_APP_CONTENTFUL_ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  };

  try {
    const response = await fetch(fetchUrl, fetchOptions).then(response =>
      response.json()
    );
    return response;
  } catch (error) {
    throw new Error("Could not receive the data from Contentful!");
  }
}

// https://www.contentful.com/blog/2021/08/26/build-using-vue-and-contentful/
export default {
 data() {
   return {
     groups: [],
     checkboxGroups: [],
   };
 },
 async created() {
   this.groups = await this.getCollection();
   this.checkboxGroups = await this.getCheckboxes();
 },
 methods: {
   getCollection: async () => {
     const query = `{
        tableOfContentGroupCollection {
          items {
            title
            tableOfContentsCollection {
              items {
                title
                tooltip
              }
            }
          }
        }
     }`;
     const result = await fetchData(query);
     
     return result.data.tableOfContentGroupCollection.items;
   },
   getCheckboxes: async () => {
     const query = `{
        tableOfContentCollection {
          items {
            title
            checkboxesCollection {
              items {
                title
                tooltip
                text {
                  json
                }
              }
            }
          }
        }
     }`;
     const result = await fetchData(query);
     
     return result.data.tableOfContentCollection.items;
   }
 }
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  font-family: 'IBM Plex Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 12px;
  font-weight: 300;
  line-height: 2.5;
  margin: 0;
  background: linear-gradient(96.9deg, rgba(217, 217, 217, 0) 5.26%, #C7B9FF 94.6%);
  color: black;
}
h2,
h3 {
  font-size: 12px;
  font-weight: 300;
  margin: 0;

}
ul {
  list-style: none;
  padding: 0;
}
ol {
  padding-left: 21px;
}
a,
button {
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  cursor: pointer;
  outline: none;
  border-radius: 0;
  font-weight: 300;
}
a:focus-visible,
button:focus-visible {
  outline: 2px dotted black;
  outline-offset: 5px;
}
.software-testing {
  max-width: 1600px;
  padding-left: 20px;
  padding-right: 20px;
}
.software-testing__heading--hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}
.software-testing__main {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
@media only screen and (max-width: 1000px) {
  .software-testing__main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 95vh;
  }
}
.software-testing__grid {
  position: relative;
  height: 95vh;
}
@media only screen and (max-width: 1000px) {
  .software-testing__grid {
    display: none;
  }
}
@media only screen and (min-width: 1000px) {
  .software-testing__message {
    display: none;
  }
}
.software-testing__message-button {
  text-align: center;
  width: 100%;
}
.software-testing__title {
  position: absolute;
  right: 0;
  bottom: 150px;
  transform: translateX(-22%) rotate(90deg);
  transform-origin: bottom right;
}
.software-testing__list--none {
  list-style: none;
  padding: 0;
}
.software-testing__link-hover {
  color: inherit;
  text-underline-offset: var(--offset, 0.2em);
  text-decoration: underline 0.10em;
  transition: --offset 400ms, text-decoration-color 400ms;
}
.software-testing__link-hover:hover,
.software-testing__link-hover:focus {
  --offset: 0.3em;
  text-decoration-color: black;
}

@supports not (background: paint(something)) {
  .software-testing__link-hover {
    transition: text-underline-offset 400ms, text-decoration-color 400ms;
  }
  
  .software-testing__link-hover:hover,
  .software-testing__link-hover:focus {
    text-underline-offset: 0.3em;
  }
}
.software-testing__extern {
  position: relative;
  padding-left: 20px;
}
.software-testing__extern::before {
  content: "➝";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%) rotate(-45deg);
  transition: 400ms all ease-in-out;
  font-size: 20px;
}
.software-testing__extern:hover::before,
.software-testing__extern:focus::before {
  transform: translateY(-45%) rotate(-45deg)
}
.software-testing__tooptip-button {
  border: 1px solid black;
  border-radius: 10%;
  width: 15px;
  height: 15px;
  margin-left: 10px;
  line-height: 0;
  transition: 400ms all ease-in-out;
}
.software-testing__tooptip-button:hover,
.software-testing__tooptip-button:focus {
  width: 18px;
  height: 18px;
}
.software-testing__tooptip-button:hover .software-testing__tooptip-icon,
.software-testing__tooptip-button:focus .software-testing__tooptip-icon {
 font-size: 13px;
}
.software-testing__tooptip-button:focus-visible {
  outline: 2px dotted black;
  outline-offset: 2px;
}
.software-testing__tooptip-icon {
  font-size: 11px;
}
.software-testing__inner {
  margin-top: 20px;
  margin-bottom: 20px;
}
.software-testing__inner--fixed {
  position: fixed;
  overflow: auto;
  height: 100%;
  padding-left: 10px;
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.software-testing__inner--fixed:focus-visible {
  outline: 2px dotted black;
  outline-offset: 5px;
}
 /* Hide scrollbar for Chrome, Safari and Opera */
.software-testing__inner--fixed::-webkit-scrollbar {
  display: none;
}
.software-testing__footer {
  height: 5vh;
  display: flex;
  justify-content: flex-end;
}
</style>
