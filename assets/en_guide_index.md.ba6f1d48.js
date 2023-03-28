import{_ as s,o as n,c as a,a as l}from"./app.4bbadaf4.js";const d=JSON.parse('{"title":"vue-draggable-plus","description":"","frontmatter":{"realPath":"docs/en/guide/index.md"},"headers":[{"level":2,"title":"Describe","slug":"describe","link":"#describe","children":[]},{"level":2,"title":"Solve pain points","slug":"solve-pain-points","link":"#solve-pain-points","children":[]},{"level":2,"title":"Install","slug":"install","link":"#install","children":[]},{"level":2,"title":"Usage","slug":"usage","link":"#usage","children":[{"level":3,"title":"Component usage","slug":"component-usage","link":"#component-usage","children":[]},{"level":3,"title":"Hooks Usage","slug":"hooks-usage","link":"#hooks-usage","children":[]},{"level":3,"title":"Directive Usage","slug":"directive-usage","link":"#directive-usage","children":[]}]}],"relativePath":"en/guide/index.md","lastUpdated":null}'),p={name:"en/guide/index.md"},o=l(`<h1 id="vue-draggable-plus" tabindex="-1">vue-draggable-plus <a class="header-anchor" href="#vue-draggable-plus" aria-hidden="true">#</a></h1><p>Drag and drop sorting module, support Vue&gt;=v3 or Vue&gt;=2.7</p><p><a href="https://stackblitz.com/edit/vue-rpa7f8?file=src%2FApp.vue" target="_blank" rel="noreferrer">Example of use</a></p><h2 id="describe" tabindex="-1">Describe <a class="header-anchor" href="#describe" aria-hidden="true">#</a></h2><p>Since the <code>vue3</code> component of <code>Sortablejs</code> has not been updated, it has been seriously out of touch with <code>vue3</code>, so this project was born. This component is based on <code>Sortablejs</code>, so if you want to know more about <code>Sortablejs</code>, you can check it out <a href="https://github.com/SortableJS/Sortable" target="_blank" rel="noreferrer"><code>Sortablejs</code> official website</a></p><p>We have encapsulated a variety of usages for this, you can use components, <code>hooks</code>, or instructions, there is always one that suits you</p><h2 id="solve-pain-points" tabindex="-1">Solve pain points <a class="header-anchor" href="#solve-pain-points" aria-hidden="true">#</a></h2><p>In <code>Sortablejs</code> official <code>Vue</code> components in the past, the drag-and-drop list is implemented by using the component as a direct child element of the list. When we use some component libraries, if there is no slot for the root element of the list in the component library , it is difficult for us to implement a drag list, vue-draggable-plus perfectly solves this problem, it allows you to use a drag list on any element, we can use the selector of the specified element to get the root element of the list, and then Use the root element of the list as <code>container</code> of <code>Sortablejs</code>, for details, refer to <a href="/vue-draggable-plus/demo/target-container/">specify target container</a>.</p><h2 id="install" tabindex="-1">Install <a class="header-anchor" href="#install" aria-hidden="true">#</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki vp-code-dark"><code><span class="line"></span>
<span class="line"><span style="color:#C9D1D9;">npm install vue-draggable-plus</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><pre class="shiki vp-code-light"><code><span class="line"></span>
<span class="line"><span style="color:#24292F;">npm install vue-draggable-plus</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-hidden="true">#</a></h2><h3 id="component-usage" tabindex="-1">Component usage <a class="header-anchor" href="#component-usage" aria-hidden="true">#</a></h3><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki vp-code-dark"><code><span class="line"><span style="color:#C9D1D9;">&lt;</span><span style="color:#7EE787;">template</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">    &lt;</span><span style="color:#7EE787;">VueDraggable</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">ref</span><span style="color:#C9D1D9;">=</span><span style="color:#A5D6FF;">&quot;el&quot;</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">v-model</span><span style="color:#C9D1D9;">=</span><span style="color:#C9D1D9;">&quot;</span><span style="color:#C9D1D9;">list</span><span style="color:#C9D1D9;">&quot;</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">      &lt;</span><span style="color:#7EE787;">div</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">v-for</span><span style="color:#C9D1D9;">=</span><span style="color:#C9D1D9;">&quot;</span><span style="color:#C9D1D9;">item </span><span style="color:#FF7B72;">in</span><span style="color:#C9D1D9;"> list</span><span style="color:#C9D1D9;">&quot;</span><span style="color:#C9D1D9;"> :</span><span style="color:#79C0FF;">key</span><span style="color:#C9D1D9;">=</span><span style="color:#C9D1D9;">&quot;</span><span style="color:#C9D1D9;">item.id</span><span style="color:#C9D1D9;">&quot;</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">        {{ item.name }}</span></span>
<span class="line"><span style="color:#C9D1D9;">      &lt;/</span><span style="color:#7EE787;">div</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">    &lt;/</span><span style="color:#7EE787;">VueDraggable</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">&lt;/</span><span style="color:#7EE787;">template</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C9D1D9;">&lt;</span><span style="color:#7EE787;">script</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">setup</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">lang</span><span style="color:#C9D1D9;">=</span><span style="color:#A5D6FF;">&quot;ts&quot;</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#FF7B72;">import</span><span style="color:#C9D1D9;"> { ref } </span><span style="color:#FF7B72;">from</span><span style="color:#C9D1D9;"> </span><span style="color:#A5D6FF;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#FF7B72;">import</span><span style="color:#C9D1D9;"> { VueDraggable } </span><span style="color:#FF7B72;">from</span><span style="color:#C9D1D9;"> </span><span style="color:#A5D6FF;">&#39;vue-draggable-plus&#39;</span></span>
<span class="line"><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">list</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">ref</span><span style="color:#C9D1D9;">([</span></span>
<span class="line"><span style="color:#C9D1D9;">  {</span></span>
<span class="line"><span style="color:#C9D1D9;">    name: </span><span style="color:#A5D6FF;">&#39;Joao&#39;</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">    id: </span><span style="color:#79C0FF;">1</span></span>
<span class="line"><span style="color:#C9D1D9;">  },</span></span>
<span class="line"><span style="color:#C9D1D9;">  {</span></span>
<span class="line"><span style="color:#C9D1D9;">    name: </span><span style="color:#A5D6FF;">&#39;Jean&#39;</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">    id: </span><span style="color:#79C0FF;">2</span></span>
<span class="line"><span style="color:#C9D1D9;">  },</span></span>
<span class="line"><span style="color:#C9D1D9;">  {</span></span>
<span class="line"><span style="color:#C9D1D9;">    name: </span><span style="color:#A5D6FF;">&#39;Johanna&#39;</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">    id: </span><span style="color:#79C0FF;">3</span></span>
<span class="line"><span style="color:#C9D1D9;">  },</span></span>
<span class="line"><span style="color:#C9D1D9;">  {</span></span>
<span class="line"><span style="color:#C9D1D9;">    name: </span><span style="color:#A5D6FF;">&#39;Juan&#39;</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">    id: </span><span style="color:#79C0FF;">4</span></span>
<span class="line"><span style="color:#C9D1D9;">  }</span></span>
<span class="line"><span style="color:#C9D1D9;">])</span></span>
<span class="line"><span style="color:#C9D1D9;">&lt;/</span><span style="color:#7EE787;">script</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"></span></code></pre><pre class="shiki vp-code-light"><code><span class="line"><span style="color:#24292F;">&lt;</span><span style="color:#116329;">template</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">    &lt;</span><span style="color:#116329;">VueDraggable</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">ref</span><span style="color:#24292F;">=</span><span style="color:#0A3069;">&quot;el&quot;</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">v-model</span><span style="color:#24292F;">=</span><span style="color:#24292F;">&quot;</span><span style="color:#24292F;">list</span><span style="color:#24292F;">&quot;</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">      &lt;</span><span style="color:#116329;">div</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">v-for</span><span style="color:#24292F;">=</span><span style="color:#24292F;">&quot;</span><span style="color:#24292F;">item </span><span style="color:#CF222E;">in</span><span style="color:#24292F;"> list</span><span style="color:#24292F;">&quot;</span><span style="color:#24292F;"> :</span><span style="color:#0550AE;">key</span><span style="color:#24292F;">=</span><span style="color:#24292F;">&quot;</span><span style="color:#24292F;">item.id</span><span style="color:#24292F;">&quot;</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">        {{ item.name }}</span></span>
<span class="line"><span style="color:#24292F;">      &lt;/</span><span style="color:#116329;">div</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">    &lt;/</span><span style="color:#116329;">VueDraggable</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">&lt;/</span><span style="color:#116329;">template</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292F;">&lt;</span><span style="color:#116329;">script</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">setup</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">lang</span><span style="color:#24292F;">=</span><span style="color:#0A3069;">&quot;ts&quot;</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#CF222E;">import</span><span style="color:#24292F;"> { ref } </span><span style="color:#CF222E;">from</span><span style="color:#24292F;"> </span><span style="color:#0A3069;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#CF222E;">import</span><span style="color:#24292F;"> { VueDraggable } </span><span style="color:#CF222E;">from</span><span style="color:#24292F;"> </span><span style="color:#0A3069;">&#39;vue-draggable-plus&#39;</span></span>
<span class="line"><span style="color:#CF222E;">const</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">list</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#8250DF;">ref</span><span style="color:#24292F;">([</span></span>
<span class="line"><span style="color:#24292F;">  {</span></span>
<span class="line"><span style="color:#24292F;">    name: </span><span style="color:#0A3069;">&#39;Joao&#39;</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">    id: </span><span style="color:#0550AE;">1</span></span>
<span class="line"><span style="color:#24292F;">  },</span></span>
<span class="line"><span style="color:#24292F;">  {</span></span>
<span class="line"><span style="color:#24292F;">    name: </span><span style="color:#0A3069;">&#39;Jean&#39;</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">    id: </span><span style="color:#0550AE;">2</span></span>
<span class="line"><span style="color:#24292F;">  },</span></span>
<span class="line"><span style="color:#24292F;">  {</span></span>
<span class="line"><span style="color:#24292F;">    name: </span><span style="color:#0A3069;">&#39;Johanna&#39;</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">    id: </span><span style="color:#0550AE;">3</span></span>
<span class="line"><span style="color:#24292F;">  },</span></span>
<span class="line"><span style="color:#24292F;">  {</span></span>
<span class="line"><span style="color:#24292F;">    name: </span><span style="color:#0A3069;">&#39;Juan&#39;</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">    id: </span><span style="color:#0550AE;">4</span></span>
<span class="line"><span style="color:#24292F;">  }</span></span>
<span class="line"><span style="color:#24292F;">])</span></span>
<span class="line"><span style="color:#24292F;">&lt;/</span><span style="color:#116329;">script</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"></span></code></pre></div><h3 id="hooks-usage" tabindex="-1">Hooks Usage <a class="header-anchor" href="#hooks-usage" aria-hidden="true">#</a></h3><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki vp-code-dark"><code><span class="line"><span style="color:#C9D1D9;">&lt;</span><span style="color:#7EE787;">template</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">    &lt;</span><span style="color:#7EE787;">div</span></span>
<span class="line"><span style="color:#C9D1D9;">      </span><span style="color:#79C0FF;">ref</span><span style="color:#C9D1D9;">=</span><span style="color:#A5D6FF;">&quot;el&quot;</span></span>
<span class="line"><span style="color:#C9D1D9;">    &gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">      &lt;</span><span style="color:#7EE787;">div</span></span>
<span class="line"><span style="color:#C9D1D9;">        </span><span style="color:#79C0FF;">v-for</span><span style="color:#C9D1D9;">=</span><span style="color:#C9D1D9;">&quot;</span><span style="color:#C9D1D9;">item </span><span style="color:#FF7B72;">in</span><span style="color:#C9D1D9;"> list</span><span style="color:#C9D1D9;">&quot;</span></span>
<span class="line"><span style="color:#C9D1D9;">        :</span><span style="color:#79C0FF;">key</span><span style="color:#C9D1D9;">=</span><span style="color:#C9D1D9;">&quot;</span><span style="color:#C9D1D9;">item.id</span><span style="color:#C9D1D9;">&quot;</span></span>
<span class="line"><span style="color:#C9D1D9;">      &gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">        {{ item.name }}</span></span>
<span class="line"><span style="color:#C9D1D9;">      &lt;/</span><span style="color:#7EE787;">div</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">    &lt;/</span><span style="color:#7EE787;">div</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">&lt;/</span><span style="color:#7EE787;">template</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C9D1D9;">&lt;</span><span style="color:#7EE787;">script</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">setup</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">lang</span><span style="color:#C9D1D9;">=</span><span style="color:#A5D6FF;">&quot;ts&quot;</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#FF7B72;">import</span><span style="color:#C9D1D9;"> { ref } </span><span style="color:#FF7B72;">from</span><span style="color:#C9D1D9;"> </span><span style="color:#A5D6FF;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#FF7B72;">import</span><span style="color:#C9D1D9;"> { useDraggable, </span><span style="color:#FF7B72;">type</span><span style="color:#C9D1D9;"> UseDraggableReturn } </span><span style="color:#FF7B72;">from</span><span style="color:#C9D1D9;"> </span><span style="color:#A5D6FF;">&#39;vue-draggable-plus&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">el</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">ref</span><span style="color:#C9D1D9;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">list</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">ref</span><span style="color:#C9D1D9;">([</span></span>
<span class="line"><span style="color:#C9D1D9;">  {</span></span>
<span class="line"><span style="color:#C9D1D9;">    name: </span><span style="color:#A5D6FF;">&#39;Joao&#39;</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">    id: </span><span style="color:#79C0FF;">1</span></span>
<span class="line"><span style="color:#C9D1D9;">  },</span></span>
<span class="line"><span style="color:#C9D1D9;">  {</span></span>
<span class="line"><span style="color:#C9D1D9;">    name: </span><span style="color:#A5D6FF;">&#39;Jean&#39;</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">    id: </span><span style="color:#79C0FF;">2</span></span>
<span class="line"><span style="color:#C9D1D9;">  },</span></span>
<span class="line"><span style="color:#C9D1D9;">  {</span></span>
<span class="line"><span style="color:#C9D1D9;">    name: </span><span style="color:#A5D6FF;">&#39;Johanna&#39;</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">    id: </span><span style="color:#79C0FF;">3</span></span>
<span class="line"><span style="color:#C9D1D9;">  },</span></span>
<span class="line"><span style="color:#C9D1D9;">  {</span></span>
<span class="line"><span style="color:#C9D1D9;">    name: </span><span style="color:#A5D6FF;">&#39;Juan&#39;</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">    id: </span><span style="color:#79C0FF;">4</span></span>
<span class="line"><span style="color:#C9D1D9;">  }</span></span>
<span class="line"><span style="color:#C9D1D9;">])</span></span>
<span class="line"><span style="color:#8B949E;">// The return value is an object, which contains some methods, such as start, destroy, pause, etc.</span></span>
<span class="line"><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">draggable</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">useDraggable</span><span style="color:#C9D1D9;">&lt;</span><span style="color:#FFA657;">UseDraggableReturn</span><span style="color:#C9D1D9;">&gt;(el, list, {</span></span>
<span class="line"><span style="color:#C9D1D9;">  animation: </span><span style="color:#79C0FF;">150</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#D2A8FF;">onStart</span><span style="color:#C9D1D9;">() {</span></span>
<span class="line"><span style="color:#C9D1D9;">    console.</span><span style="color:#D2A8FF;">log</span><span style="color:#C9D1D9;">(</span><span style="color:#A5D6FF;">&#39;start&#39;</span><span style="color:#C9D1D9;">)</span></span>
<span class="line"><span style="color:#C9D1D9;">  },</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#D2A8FF;">onUpdate</span><span style="color:#C9D1D9;">() {</span></span>
<span class="line"><span style="color:#C9D1D9;">    console.</span><span style="color:#D2A8FF;">log</span><span style="color:#C9D1D9;">(</span><span style="color:#A5D6FF;">&#39;update&#39;</span><span style="color:#C9D1D9;">)</span></span>
<span class="line"><span style="color:#C9D1D9;">  }</span></span>
<span class="line"><span style="color:#C9D1D9;">})</span></span>
<span class="line"><span style="color:#C9D1D9;">&lt;/</span><span style="color:#7EE787;">script</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"></span></code></pre><pre class="shiki vp-code-light"><code><span class="line"><span style="color:#24292F;">&lt;</span><span style="color:#116329;">template</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">    &lt;</span><span style="color:#116329;">div</span></span>
<span class="line"><span style="color:#24292F;">      </span><span style="color:#0550AE;">ref</span><span style="color:#24292F;">=</span><span style="color:#0A3069;">&quot;el&quot;</span></span>
<span class="line"><span style="color:#24292F;">    &gt;</span></span>
<span class="line"><span style="color:#24292F;">      &lt;</span><span style="color:#116329;">div</span></span>
<span class="line"><span style="color:#24292F;">        </span><span style="color:#0550AE;">v-for</span><span style="color:#24292F;">=</span><span style="color:#24292F;">&quot;</span><span style="color:#24292F;">item </span><span style="color:#CF222E;">in</span><span style="color:#24292F;"> list</span><span style="color:#24292F;">&quot;</span></span>
<span class="line"><span style="color:#24292F;">        :</span><span style="color:#0550AE;">key</span><span style="color:#24292F;">=</span><span style="color:#24292F;">&quot;</span><span style="color:#24292F;">item.id</span><span style="color:#24292F;">&quot;</span></span>
<span class="line"><span style="color:#24292F;">      &gt;</span></span>
<span class="line"><span style="color:#24292F;">        {{ item.name }}</span></span>
<span class="line"><span style="color:#24292F;">      &lt;/</span><span style="color:#116329;">div</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">    &lt;/</span><span style="color:#116329;">div</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">&lt;/</span><span style="color:#116329;">template</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292F;">&lt;</span><span style="color:#116329;">script</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">setup</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">lang</span><span style="color:#24292F;">=</span><span style="color:#0A3069;">&quot;ts&quot;</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#CF222E;">import</span><span style="color:#24292F;"> { ref } </span><span style="color:#CF222E;">from</span><span style="color:#24292F;"> </span><span style="color:#0A3069;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#CF222E;">import</span><span style="color:#24292F;"> { useDraggable, </span><span style="color:#CF222E;">type</span><span style="color:#24292F;"> UseDraggableReturn } </span><span style="color:#CF222E;">from</span><span style="color:#24292F;"> </span><span style="color:#0A3069;">&#39;vue-draggable-plus&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#CF222E;">const</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">el</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#8250DF;">ref</span><span style="color:#24292F;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#CF222E;">const</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">list</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#8250DF;">ref</span><span style="color:#24292F;">([</span></span>
<span class="line"><span style="color:#24292F;">  {</span></span>
<span class="line"><span style="color:#24292F;">    name: </span><span style="color:#0A3069;">&#39;Joao&#39;</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">    id: </span><span style="color:#0550AE;">1</span></span>
<span class="line"><span style="color:#24292F;">  },</span></span>
<span class="line"><span style="color:#24292F;">  {</span></span>
<span class="line"><span style="color:#24292F;">    name: </span><span style="color:#0A3069;">&#39;Jean&#39;</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">    id: </span><span style="color:#0550AE;">2</span></span>
<span class="line"><span style="color:#24292F;">  },</span></span>
<span class="line"><span style="color:#24292F;">  {</span></span>
<span class="line"><span style="color:#24292F;">    name: </span><span style="color:#0A3069;">&#39;Johanna&#39;</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">    id: </span><span style="color:#0550AE;">3</span></span>
<span class="line"><span style="color:#24292F;">  },</span></span>
<span class="line"><span style="color:#24292F;">  {</span></span>
<span class="line"><span style="color:#24292F;">    name: </span><span style="color:#0A3069;">&#39;Juan&#39;</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">    id: </span><span style="color:#0550AE;">4</span></span>
<span class="line"><span style="color:#24292F;">  }</span></span>
<span class="line"><span style="color:#24292F;">])</span></span>
<span class="line"><span style="color:#6E7781;">// The return value is an object, which contains some methods, such as start, destroy, pause, etc.</span></span>
<span class="line"><span style="color:#CF222E;">const</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">draggable</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#8250DF;">useDraggable</span><span style="color:#24292F;">&lt;</span><span style="color:#953800;">UseDraggableReturn</span><span style="color:#24292F;">&gt;(el, list, {</span></span>
<span class="line"><span style="color:#24292F;">  animation: </span><span style="color:#0550AE;">150</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#8250DF;">onStart</span><span style="color:#24292F;">() {</span></span>
<span class="line"><span style="color:#24292F;">    console.</span><span style="color:#8250DF;">log</span><span style="color:#24292F;">(</span><span style="color:#0A3069;">&#39;start&#39;</span><span style="color:#24292F;">)</span></span>
<span class="line"><span style="color:#24292F;">  },</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#8250DF;">onUpdate</span><span style="color:#24292F;">() {</span></span>
<span class="line"><span style="color:#24292F;">    console.</span><span style="color:#8250DF;">log</span><span style="color:#24292F;">(</span><span style="color:#0A3069;">&#39;update&#39;</span><span style="color:#24292F;">)</span></span>
<span class="line"><span style="color:#24292F;">  }</span></span>
<span class="line"><span style="color:#24292F;">})</span></span>
<span class="line"><span style="color:#24292F;">&lt;/</span><span style="color:#116329;">script</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"></span></code></pre></div><h3 id="directive-usage" tabindex="-1">Directive Usage <a class="header-anchor" href="#directive-usage" aria-hidden="true">#</a></h3><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki vp-code-dark"><code><span class="line"><span style="color:#C9D1D9;">&lt;</span><span style="color:#7EE787;">template</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">    &lt;</span><span style="color:#7EE787;">div</span></span>
<span class="line"><span style="color:#C9D1D9;">      </span><span style="color:#79C0FF;">v-draggable</span><span style="color:#C9D1D9;">=</span><span style="color:#C9D1D9;">&quot;</span><span style="color:#C9D1D9;">[</span></span>
<span class="line"><span style="color:#C9D1D9;">        list,</span></span>
<span class="line"><span style="color:#C9D1D9;">        {</span></span>
<span class="line"><span style="color:#C9D1D9;">          animation: </span><span style="color:#79C0FF;">150</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">        }</span></span>
<span class="line"><span style="color:#C9D1D9;">      ]</span><span style="color:#C9D1D9;">&quot;</span></span>
<span class="line"><span style="color:#C9D1D9;">    &gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">      &lt;</span><span style="color:#7EE787;">div</span></span>
<span class="line"><span style="color:#C9D1D9;">        </span><span style="color:#79C0FF;">v-for</span><span style="color:#C9D1D9;">=</span><span style="color:#C9D1D9;">&quot;</span><span style="color:#C9D1D9;">item </span><span style="color:#FF7B72;">in</span><span style="color:#C9D1D9;"> list</span><span style="color:#C9D1D9;">&quot;</span></span>
<span class="line"><span style="color:#C9D1D9;">        :</span><span style="color:#79C0FF;">key</span><span style="color:#C9D1D9;">=</span><span style="color:#C9D1D9;">&quot;</span><span style="color:#C9D1D9;">item.id</span><span style="color:#C9D1D9;">&quot;</span></span>
<span class="line"><span style="color:#C9D1D9;">      &gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">        {{ item.name }}</span></span>
<span class="line"><span style="color:#C9D1D9;">      &lt;/</span><span style="color:#7EE787;">div</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">    &lt;/</span><span style="color:#7EE787;">div</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#C9D1D9;">&lt;/</span><span style="color:#7EE787;">template</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C9D1D9;">&lt;</span><span style="color:#7EE787;">script</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">setup</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">lang</span><span style="color:#C9D1D9;">=</span><span style="color:#A5D6FF;">&quot;ts&quot;</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"><span style="color:#FF7B72;">import</span><span style="color:#C9D1D9;"> { ref } </span><span style="color:#FF7B72;">from</span><span style="color:#C9D1D9;"> </span><span style="color:#A5D6FF;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#FF7B72;">import</span><span style="color:#C9D1D9;"> { vDraggable } </span><span style="color:#FF7B72;">from</span><span style="color:#C9D1D9;"> </span><span style="color:#A5D6FF;">&#39;vue-draggable-plus&#39;</span></span>
<span class="line"><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">list</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">ref</span><span style="color:#C9D1D9;">([</span></span>
<span class="line"><span style="color:#C9D1D9;">  {</span></span>
<span class="line"><span style="color:#C9D1D9;">    name: </span><span style="color:#A5D6FF;">&#39;Joao&#39;</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">    id: </span><span style="color:#79C0FF;">1</span></span>
<span class="line"><span style="color:#C9D1D9;">  },</span></span>
<span class="line"><span style="color:#C9D1D9;">  {</span></span>
<span class="line"><span style="color:#C9D1D9;">    name: </span><span style="color:#A5D6FF;">&#39;Jean&#39;</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">    id: </span><span style="color:#79C0FF;">2</span></span>
<span class="line"><span style="color:#C9D1D9;">  },</span></span>
<span class="line"><span style="color:#C9D1D9;">  {</span></span>
<span class="line"><span style="color:#C9D1D9;">    name: </span><span style="color:#A5D6FF;">&#39;Johanna&#39;</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">    id: </span><span style="color:#79C0FF;">3</span></span>
<span class="line"><span style="color:#C9D1D9;">  },</span></span>
<span class="line"><span style="color:#C9D1D9;">  {</span></span>
<span class="line"><span style="color:#C9D1D9;">    name: </span><span style="color:#A5D6FF;">&#39;Juan&#39;</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">    id: </span><span style="color:#79C0FF;">4</span></span>
<span class="line"><span style="color:#C9D1D9;">  }</span></span>
<span class="line"><span style="color:#C9D1D9;">])</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF7B72;">function</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">onStart</span><span style="color:#C9D1D9;">() {</span></span>
<span class="line"><span style="color:#C9D1D9;">  console.</span><span style="color:#D2A8FF;">log</span><span style="color:#C9D1D9;">(</span><span style="color:#A5D6FF;">&#39;start&#39;</span><span style="color:#C9D1D9;">)</span></span>
<span class="line"><span style="color:#C9D1D9;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF7B72;">function</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">onUpdate</span><span style="color:#C9D1D9;">() {</span></span>
<span class="line"><span style="color:#C9D1D9;">  console.</span><span style="color:#D2A8FF;">log</span><span style="color:#C9D1D9;">(</span><span style="color:#A5D6FF;">&#39;update&#39;</span><span style="color:#C9D1D9;">)</span></span>
<span class="line"><span style="color:#C9D1D9;">}</span></span>
<span class="line"><span style="color:#C9D1D9;">&lt;/</span><span style="color:#7EE787;">script</span><span style="color:#C9D1D9;">&gt;</span></span>
<span class="line"></span></code></pre><pre class="shiki vp-code-light"><code><span class="line"><span style="color:#24292F;">&lt;</span><span style="color:#116329;">template</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">    &lt;</span><span style="color:#116329;">div</span></span>
<span class="line"><span style="color:#24292F;">      </span><span style="color:#0550AE;">v-draggable</span><span style="color:#24292F;">=</span><span style="color:#24292F;">&quot;</span><span style="color:#24292F;">[</span></span>
<span class="line"><span style="color:#24292F;">        list,</span></span>
<span class="line"><span style="color:#24292F;">        {</span></span>
<span class="line"><span style="color:#24292F;">          animation: </span><span style="color:#0550AE;">150</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">        }</span></span>
<span class="line"><span style="color:#24292F;">      ]</span><span style="color:#24292F;">&quot;</span></span>
<span class="line"><span style="color:#24292F;">    &gt;</span></span>
<span class="line"><span style="color:#24292F;">      &lt;</span><span style="color:#116329;">div</span></span>
<span class="line"><span style="color:#24292F;">        </span><span style="color:#0550AE;">v-for</span><span style="color:#24292F;">=</span><span style="color:#24292F;">&quot;</span><span style="color:#24292F;">item </span><span style="color:#CF222E;">in</span><span style="color:#24292F;"> list</span><span style="color:#24292F;">&quot;</span></span>
<span class="line"><span style="color:#24292F;">        :</span><span style="color:#0550AE;">key</span><span style="color:#24292F;">=</span><span style="color:#24292F;">&quot;</span><span style="color:#24292F;">item.id</span><span style="color:#24292F;">&quot;</span></span>
<span class="line"><span style="color:#24292F;">      &gt;</span></span>
<span class="line"><span style="color:#24292F;">        {{ item.name }}</span></span>
<span class="line"><span style="color:#24292F;">      &lt;/</span><span style="color:#116329;">div</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">    &lt;/</span><span style="color:#116329;">div</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#24292F;">&lt;/</span><span style="color:#116329;">template</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292F;">&lt;</span><span style="color:#116329;">script</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">setup</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">lang</span><span style="color:#24292F;">=</span><span style="color:#0A3069;">&quot;ts&quot;</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"><span style="color:#CF222E;">import</span><span style="color:#24292F;"> { ref } </span><span style="color:#CF222E;">from</span><span style="color:#24292F;"> </span><span style="color:#0A3069;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#CF222E;">import</span><span style="color:#24292F;"> { vDraggable } </span><span style="color:#CF222E;">from</span><span style="color:#24292F;"> </span><span style="color:#0A3069;">&#39;vue-draggable-plus&#39;</span></span>
<span class="line"><span style="color:#CF222E;">const</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">list</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">=</span><span style="color:#24292F;"> </span><span style="color:#8250DF;">ref</span><span style="color:#24292F;">([</span></span>
<span class="line"><span style="color:#24292F;">  {</span></span>
<span class="line"><span style="color:#24292F;">    name: </span><span style="color:#0A3069;">&#39;Joao&#39;</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">    id: </span><span style="color:#0550AE;">1</span></span>
<span class="line"><span style="color:#24292F;">  },</span></span>
<span class="line"><span style="color:#24292F;">  {</span></span>
<span class="line"><span style="color:#24292F;">    name: </span><span style="color:#0A3069;">&#39;Jean&#39;</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">    id: </span><span style="color:#0550AE;">2</span></span>
<span class="line"><span style="color:#24292F;">  },</span></span>
<span class="line"><span style="color:#24292F;">  {</span></span>
<span class="line"><span style="color:#24292F;">    name: </span><span style="color:#0A3069;">&#39;Johanna&#39;</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">    id: </span><span style="color:#0550AE;">3</span></span>
<span class="line"><span style="color:#24292F;">  },</span></span>
<span class="line"><span style="color:#24292F;">  {</span></span>
<span class="line"><span style="color:#24292F;">    name: </span><span style="color:#0A3069;">&#39;Juan&#39;</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">    id: </span><span style="color:#0550AE;">4</span></span>
<span class="line"><span style="color:#24292F;">  }</span></span>
<span class="line"><span style="color:#24292F;">])</span></span>
<span class="line"></span>
<span class="line"><span style="color:#CF222E;">function</span><span style="color:#24292F;"> </span><span style="color:#8250DF;">onStart</span><span style="color:#24292F;">() {</span></span>
<span class="line"><span style="color:#24292F;">  console.</span><span style="color:#8250DF;">log</span><span style="color:#24292F;">(</span><span style="color:#0A3069;">&#39;start&#39;</span><span style="color:#24292F;">)</span></span>
<span class="line"><span style="color:#24292F;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#CF222E;">function</span><span style="color:#24292F;"> </span><span style="color:#8250DF;">onUpdate</span><span style="color:#24292F;">() {</span></span>
<span class="line"><span style="color:#24292F;">  console.</span><span style="color:#8250DF;">log</span><span style="color:#24292F;">(</span><span style="color:#0A3069;">&#39;update&#39;</span><span style="color:#24292F;">)</span></span>
<span class="line"><span style="color:#24292F;">}</span></span>
<span class="line"><span style="color:#24292F;">&lt;/</span><span style="color:#116329;">script</span><span style="color:#24292F;">&gt;</span></span>
<span class="line"></span></code></pre></div>`,17),e=[o];function t(c,r,y,i,D,F){return n(),a("div",null,e)}const u=s(p,[["render",t]]);export{d as __pageData,u as default};
