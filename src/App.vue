<template>
  <div class="template">
      <div class="table-of-content">
        <div v-for="group in groups" :key="group.title">
          <ol>
            <li v-for="item in group.tableOfContentsCollection.items" :key="item.title">
              <button class="link-hover">{{item.title}}</button>
              <span v-if="item.tooltip">{{item.tooltip}}</span>
            </li>
          </ol>
        </div>
      </div>

      <div class="checklist">
        <div v-for="checkboxGroup in checkboxGroups" :key="checkboxGroup.title">
          <h2>{{checkboxGroup.title}}</h2>
          <ul>
            <li v-for="checkbox in checkboxGroup.checkboxesCollection.items" :key="checkbox.title">
              <button class="link-hover">{{checkbox.title}}</button>
              <span v-if="checkbox.tooltip">{{checkbox.tooltip}}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="linklist">
        <!-- <div v-for="checkboxGroup in checkboxGroups" :key="checkboxGroup.title">
          <ul>
            <li v-for="checkbox in checkboxGroup.checkboxesCollection.items" :key="checkbox.title">
              {{checkbox.title}}
              <span v-if="checkbox.text">{{checkbox.text}}</span>
            </li>
          </ul>
        </div> -->
      </div>
  </div>
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
  font-size: 14px;
  line-height: 2.5;
  margin: 0;
  background: linear-gradient(96.9deg, rgba(217, 217, 217, 0) 5.26%, #C7B9FF 94.6%);
  color: black;
}
h2 {
  font-size: 14px;
  margin-bottom: 0;
}
ul {
  list-style: none;
  padding: 0;
}
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
}
.template {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
.link-hover {
  color: inherit;
  text-underline-offset: var(--offset, 0.2em);
  text-decoration: underline 0.10em;
  transition: --offset 400ms, text-decoration-color 400ms;
}
.link-hover:hover,
.link-hover:focus {
  --offset: 0.3em;
  text-decoration-color: black;
}

@supports not (background: paint(something)) {
  .link-hover {
    transition: text-underline-offset 400ms, text-decoration-color 400ms;
  }
  
  .link-hover:hover,
  .link-hover:focus {
    text-underline-offset: 0.3em;
  }
}
</style>
