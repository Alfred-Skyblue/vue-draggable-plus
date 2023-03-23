import{_ as s,o as n,c as a,a as l}from"./app.cf4ac032.js";const d=JSON.parse('{"title":"说明","description":"","frontmatter":{"realPath":"docs/guide/index.md"},"headers":[{"level":2,"title":"解决痛点","slug":"解决痛点","link":"#解决痛点","children":[]},{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":2,"title":"使用","slug":"使用","link":"#使用","children":[{"level":3,"title":"组件方式","slug":"组件方式","link":"#组件方式","children":[]},{"level":3,"title":"hooks 方式","slug":"hooks-方式","link":"#hooks-方式","children":[]},{"level":3,"title":"指令方式","slug":"指令方式","link":"#指令方式","children":[]}]}],"relativePath":"guide/index.md","lastUpdated":null}'),p={name:"guide/index.md"},o=l(`<h1 id="说明" tabindex="-1">说明 <a class="header-anchor" href="#说明" aria-hidden="true">#</a></h1><p>由于 <code>Sortablejs</code> 的 <code>vue3</code> 组件一直没有更新，已经跟 <code>vue3</code> 严重脱节，所以诞生了这个项目，这个组件是基于 <code>Sortablejs</code> 的，所以如果你想了解更多关于 <code>Sortablejs</code> 的信息，可以查看<a href="https://github.com/SortableJS/Sortable" target="_blank" rel="noreferrer">Sortablejs 官网</a>。</p><p>我们对此封装了多种用法，您可以使用组件的方式，也可以使用 <code>hooks</code> 的方式，也可以使用指令的方式，总有一款适合您。</p><h2 id="解决痛点" tabindex="-1">解决痛点 <a class="header-anchor" href="#解决痛点" aria-hidden="true">#</a></h2><p>在 <code>Sortablejs</code> 官方以往的 <code>Vue</code> 组件中，都是通过使用组件作为列表的直接子元素来实现拖拽列表，当我们使用一些组件库时，如果组件库中没有提供列表根元素的插槽，我们很难实现拖拽列表，vue-draggable-plus 完美解决了这个问题，它可以让你在任何元素上使用拖拽列表，我们可以使用指定元素的选择器，来获取到列表根元素，然后将列表根元素作为 <code>Sortablejs</code> 的 <code>container</code>，详情参考<a href="/demo/target-container/">指定目标容器</a>。</p><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-hidden="true">#</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki vp-code-dark"><code><span class="line"><span style="color:#C9D1D9;">npm install vue-draggable-plus</span></span>
<span class="line"></span></code></pre><pre class="shiki vp-code-light"><code><span class="line"><span style="color:#24292F;">npm install vue-draggable-plus</span></span>
<span class="line"></span></code></pre></div><h2 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-hidden="true">#</a></h2><h3 id="组件方式" tabindex="-1">组件方式 <a class="header-anchor" href="#组件方式" aria-hidden="true">#</a></h3><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki vp-code-dark"><code><span class="line"><span style="color:#C9D1D9;">&lt;</span><span style="color:#7EE787;">template</span><span style="color:#C9D1D9;">&gt;</span></span>
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
<span class="line"></span></code></pre></div><h3 id="hooks-方式" tabindex="-1">hooks 方式 <a class="header-anchor" href="#hooks-方式" aria-hidden="true">#</a></h3><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki vp-code-dark"><code><span class="line"><span style="color:#C9D1D9;">&lt;</span><span style="color:#7EE787;">template</span><span style="color:#C9D1D9;">&gt;</span></span>
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
<span class="line"><span style="color:#8B949E;">// 返回值是一个对象，包含了一些方法，比如 start、destroy、pause 等</span></span>
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
<span class="line"><span style="color:#6E7781;">// 返回值是一个对象，包含了一些方法，比如 start、destroy、pause 等</span></span>
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
<span class="line"></span></code></pre></div><h3 id="指令方式" tabindex="-1">指令方式 <a class="header-anchor" href="#指令方式" aria-hidden="true">#</a></h3><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki vp-code-dark"><code><span class="line"><span style="color:#C9D1D9;">&lt;</span><span style="color:#7EE787;">template</span><span style="color:#C9D1D9;">&gt;</span></span>
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
<span class="line"></span></code></pre></div>`,14),e=[o];function t(c,r,y,D,i,F){return n(),a("div",null,e)}const u=s(p,[["render",t]]);export{d as __pageData,u as default};
