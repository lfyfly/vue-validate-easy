<!-- —————————————↓SCSS———————分界线————————————————————————— -->

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
a{
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}

html,
body,
#app {
  height: 100%;
  margin: 0;
}
#app.is-mobile {
  #main > * {
    max-width: auto;
    min-width: auto;
  }
}
#app.is-mobile {
  #catalog {
    position: fixed !important;
    width: 100%;
    z-index: 2;
    .close {
      position: fixed;
      top: -4px;
      right: 0;
      width: 40px;
      height: 40px;
      font-size: 30px;
      line-height: 40px;
      z-index: 1;
      text-align: right;

      &::after {
        content: "×";
        color: rgba(0, 0, 0, 0.5);
        font-size: 50px;
        font-weight: 300;
      }
    }
  }
}
#app {
  a {
    color: #24292e;
  }
  box-sizing: border-box;
  font-family: Microsoft YaHei, 黑体, verdana, sans-serif;
  #main > * {
    max-width: 1000px;
    min-width: 600px;
  }
  #main {
    padding: 20px;
    ul{
      padding-left: 0;
    }
    #catalog-btn {
      position: fixed;
      right: 0;
      z-index: 1;
      top: 10px;
      right: 3px;
      width: 30px;
      background: #cccccc;
      border-top: 3px solid rgba(0, 0, 0, 0.5);
      border-bottom: 3px solid rgba(0, 0, 0, 0.5);
      background: rgba(0, 0, 0, 0.5);
      padding: 5px 0;
      box-sizing: content-box;
      height: 3px;
      background-clip: content-box;
    }
  }
  #catalog {
    float: left;
  }
  & > * {
    overflow: auto;
    height: 100%;
    box-sizing: border-box;
  }
  #catalog {
    padding: 0 20px 20px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    line-height: 1.6;
    a {
      color: #551a8b;
      display: block;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
      &:active {
        color: #551a8b;
      }
      &.h1 {
        margin-top: 10px;
        font-weight: bold;
      }
      &.h3 {
        font-size: 12px;
        padding-left: 20px;
      }
    }
  }
  form {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  input,
  button,
  select {
    outline: none;
  }
  select,
  option {
    font-size: 16px;
  }
  select {
    min-height: 24px;
  }
  .btn-group {
    margin-bottom: 10px;
    & > * {
      margin-right: 10px;
    }
  }
  .my-btn {
    line-height: 24px;
    background: #fff;
    border: 1px solid #919191;
    border-radius: 4px;
    transition: background 0.5s;
    &:hover {
      background: #f3f3f3;
      cursor: pointer;
    }
  }
  .my-form-group {
    margin-bottom: 20px;
    .label {
      font-weight: bold;
      margin-bottom: 2px;
    }
    input.input {
      height: 30px;
      width: 100%;
      outline: none;
      box-sizing: border-box;
      padding-left: 6px;
      border: 1px solid #919191;
      border-radius: 4px;
    }
    label.radio,
    label.checkbox {
      margin-right: 10px;
      input {
        margin-right: 4px;
      }
    }
    input::-webkit-input-placeholder {
      color: #ccc;
    }
    input::-moz-placeholder {
      color: #ccc;
    }
    input:-moz-placeholder {
      color: #ccc;
    }
    input:-ms-input-placeholder {
      color: #ccc;
    }
    // 赋予验证错误的样式和验证成功的样式
  }
  .err__ input.input {
    border: 1px solid red;
  }
  .succ__ input.input {
    border: 1px solid green;
  }
  .err__msg {
    color: red;
    display: block;
    font-size: 14px;
  }
}
</style>

<!-- —————————————↓HTML————————分界线———————————————————————— -->
<template lang="pug">
#app(:class="{'is-mobile': isMobile}")
  transition(name="fade")
    #catalog(v-show="catalogShow",@click="clickCatalog")
      .close
  #main.markdown-body
    #catalog-btn(v-if="isMobile",@click="catalogShow=true")
    #content
      :markdown-it
        # 实例教程
        ## 1. 开始
        ### 1.1 安装
        ```nohighlight
          npm install vue-validate-easy --save
        ```
        ### 1.2 引用
        在main.js文件中引用
        ```js
          import vueValidateEasy from 'vue-validate-easy'
          Vue.use(vueValidateEasy)
        ```

        ## 2. 实例
        ### 2.1 基本示例

      code-tab#example_1(:nav="[{name:'demo'},{name:'html'},{name:'javascript'},{name:'css'}]")
        template(slot ="demo")
          form.example_1
            div.my-form-group(data-scope="example_1" data-name="email" data-type="input" v-validate-easy="[['required','邮箱为必填项目'],['email']]")
              label
                div.label 邮箱
                input.input( type="text" spellcheck="false"  placeholder="请输入邮箱" )

            div.my-form-group(data-scope="example_1" data-name="any" data-type="input" v-validate-easy="")
              label
                div.label 随便写点什么
                input.input( type="text" spellcheck="false"  placeholder="该字段不做验证" )

            div.my-form-group(data-scope="example_1" data-name="number" data-type="input" v-validate-easy="[['number']]")
              label
                div.label 数字（非必须但有值需要验证）
                input.input( type="text" spellcheck="false"  placeholder="输入一段数字" )

            div.btn-group
              button.my-btn(@click.prevent="submit('example_1')") 提交表单
              button.my-btn(@click.prevent="reset('example_1')") 重置表单

        template(slot="html")
          :markdown-it
            ```html
              <!-- 快速使用步骤 -->
              <!-- 1.给.my-form-group元素data-scope属性是必填的，代表着是同一组的表单。 -->
              <!-- 2.给.my-form-group元素data-name是必填的，代表字段的键值。 -->
              <!-- 3.给.my-form-group元素data-type是必填的，说明原生表单的元素类别。 -->
              <!-- 4.给.my-form-group元素 v-validate-easy 指令的值。 指令参数详情见：2.2 指令参数。 -->

              <!-- 约定：-->
              <!-- v-validate-easy指令必须在原生表单元素的上层元素上使用 -->
              <!-- 且 data-scope data-name data-type 只能在使用v-validate-easy指令的元素上使用 -->
              <form class="example_1">
                <div class="my-form-group" data-scope="example_1" data-name="email" data-type="input"
                v-validate-easy="[['required','邮箱为必填项目'],['email']]">
                  <label>
                    <div class="label">邮箱</div>
                    <input class="input" type="text" spellcheck="false" placeholder="请输入邮箱"/>
                  </label>
                </div>

                <div class="my-form-group" data-scope="example_1" data-name="any" data-type="input" v-validate-easy>
                  <label>
                    <div class="label">随便写点什么</div>
                    <input class="input" type="text" spellcheck="false" placeholder="该字段不做验证"/>
                  </label>
                </div>

                <div class="my-form-group" data-scope="example_1" data-name="number" data-type="input"
                v-validate-easy="[['number']]">
                  <label>
                    <div class="label">数字（非必须但有值需要验证）</div>
                    <input class="input" type="text" spellcheck="false" placeholder="输入一段数字"/>
                  </label>
                </div>

                <div class="btn-group">
                  <button class="my-btn" @click.prevent="submit('example_1')">提交表单</button>
                  <button class="my-btn" @click.prevent="reset('example_1')">重置表单</button>
                </div>
              </form>
            ```
        template(slot="javascript")
          :markdown-it
            ```js
              // 重置表单方法：this.V.$reset(scope)
              // 提交表单方法: this.V.$submit(scope,(canSumit,data)=>{}) 回调函数会在该scope所有的表单元素全部验证完成后执行
              methods: {
                reset(scope) {
                  this.V.$reset(scope)
                },
                submit(scope) {
                  this.V.$submit(scope, (canSumit,data) => {
                    // canSumit为true时，则所有该scope的所有表单验证通过
                    if(!canSumit) return

                    // 只有验证全部通过才会执行
                    console.log('验证通过的数据'+data)
                    alert('验证通过,数据如下\n' + JSON.stringify(data))

                    // 发送请求
                    axios({ url: '/test',data, method: 'post'})
                      .then(() => {
                        // 成功响应处理
                      })
                      .catch(() => {
                        // 错误处理
                      })
                  })
                }
              },
            ```
        template(slot="css")
          :markdown-it
            ```css
              /* 赋予验证错误的样式和验证成功的样式 */
              /* 验证成功时时，会对使用指令的元素加上className succ__ */
              /* 验证错误时，会对使用指令的元素加上className err__ */
              /* 验证错误时，默认在使用指令的元素子元素末尾追加一个错误提示元素，是一个span元素，className为 err__msg */
              /* 如果你在使用指令元素内部，预设了一个className为 err__msg 的元素,那么它将作为错误信息的容器元素 */
              .err__ input.input {
                border: 1px solid red;
              }
              .succ__ input.input {
                border: 1px solid green;
              }
              .err__msg {
                color: red;
                display: block;
                font-size: 14px;
              }
            ```
      :markdown-it
        ### 2.2 指令参数书写规则
        `v-validate-easy指令必须在原生表单元素的上层元素上使用`
      code-tab#example_2(:nav="[{name:'demo'},{name:'html'}]")
        template(slot="demo")
          form.example_2
            div.my-form-group(data-scope="example_2" data-name="sid1" data-type="input" v-validate-easy="[['required'],['number'],['minLength',[10]]]")
              label
                div.label 学号1（默认错误提示语和传递验证参数）
                input.input(type="text" spellcheck="false" placeholder="请输入学号" )
            div.my-form-group(data-scope="example_2" data-name="sid2" data-type="input" v-validate-easy="[['required','学号为必填项'],['number','学号为全数字构成'],['minLength',[10],'学号最小长度为10位']]")
              label
                div.label 学号2（自定义错误提示语）
                input.input(type="text" spellcheck="false"  placeholder="请输入学号")
            div.my-form-group(data-scope="example_2" data-name="sid3" data-type="input" v-validate-easy="[['required',''],['number',''],['minLength',[10],'']]")
              label
                div.label 学号3（隐藏错误提示语）
                input.input(type="text" spellcheck="false"  placeholder="请输入学号")
            div.btn-group
              button.my-btn(@click.prevent="submit('example_2')") 提交表单
              button.my-btn(@click.prevent="reset('example_2')") 重置表单
        template(slot="html")
          :markdown-it
            ```html
              <!-- 指令参数的完整结构为 [[验证方法名,[验证方法参数1,验证方法参数2,..],自定义错误提示语],[],..] -->
              <!-- 当验证方法无需参数时，可写成 [[验证方法名,自定义错误提示语],[],..] -->
              <!-- 根据数组顺序对表单值进行验证，并且显示第一个验证错误的提示语 -->
              <!-- 指令的值并不是都必须填写完整的，可以看下面三个例子 -->
              <form class="example_2">
                <!-- 默认验证错误提示语来自验证方法的返回值 -->
                <div class="my-form-group" data-scope="example_2" data-name="sid1" data-type="input"
                  v-validate-easy="[['required'],['number'],['minLength',[10]]]">
                  <label>
                    <div class="label">学号1（默认错误提示语和传递验证参数）</div>
                    <input class="input" type="text" spellcheck="false" placeholder="请输入学号"/>
                  </label>
                </div>

                <!-- 传入自定义错误提示语 -->
                <div class="my-form-group" data-scope="example_2" data-name="sid2" data-type="input"
                  v-validate-easy="[['required','学号为必填项'],['number','学号为全数字构成'],['minLength',[10],'学号最小长度为10位']]">
                  <label>
                    <div class="label">学号2（自定义错误提示语）</div>
                    <input class="input" type="text" spellcheck="false" placeholder="请输入学号"/>
                  </label>
                </div>

                <!-- 当自定义提示语为空字符串时，那么错误提示语会被隐藏 -->
                <div class="my-form-group" data-scope="example_2" data-name="sid3" data-type="input"
                  v-validate-easy="[['required',''],['number',''],['minLength',[10],'']]">
                  <label>
                    <div class="label">学号3（隐藏错误提示语）</div>
                    <input class="input" type="text" spellcheck="false" placeholder="请输入学号"/>
                  </label>
                </div>

                <div class="btn-group">
                  <button class="my-btn" @click.prevent="submit('example_2')">提交表单</button>
                  <button class="my-btn" @click.prevent="reset('example_2')">重置表单</button>
                </div>
              </form>
            ```
      :markdown-it
        ### 2.3 指令修饰符(懒验证，延时验证)
      code-tab#example_3(:nav="[{name:'demo'},{name:'html'}]")
        template(slot="demo")
          form.example_3
            div.my-form-group(
              data-scope="example_3" data-name="sid1" data-type="input"
              v-validate-easy.lazy="[['required','学号为必填项'],['number','学号为全数字构成'],['minLength',[10],'学号最小长度为10位']]"
            )
              label
                div.label 学号1（.lazy修饰符，blur事件才触发验证）
                input.input( type="text" spellcheck="false" placeholder="请输入学号" )
            div.my-form-group(
              data-scope="example_3" data-name="sid2" data-type="input"
              v-validate-easy.delay="[['required','学号为必填项'],['number','学号为全数字构成'],['minLength',[10],'学号最小长度为10位']]")
              label
                div.label 学号2（.delay修饰符，输入时每隔500ms触发验证）
                input.input(type="text" spellcheck="false" placeholder="请输入学号")
            div.my-form-group(
              data-scope="example_3" data-name="sid3" data-type="input" data-delay="2000"
              v-validate-easy="[['required','学号为必填项'],['number','学号为全数字构成'],['minLength',[10],'学号最小长度为10位']]"
            )
              label
                div.label 学号3（使用data-delay属性定义触发间隔时间，输入时每隔2s触发验证）
                input.input( type="text" spellcheck="false" placeholder="请输入学号" )
            div.my-form-group
              label(
                data-scope="example_3" data-name="sid4" data-type="input"
                v-validate-easy.lazy.delay="[['required','学号为必填项'],['number','学号为全数字构成'],['minLength',[10],'学号最小长度为10位']]"
              )
                div.label 学号4（.lazy.delay同时使用时,只有.lazy生效）
                input.input( type="text" spellcheck="false" placeholder="请输入学号" )
            div.btn-group
              button.my-btn(@click.prevent="submit('example_3')") 提交表单
              button.my-btn(@click.prevent="reset('example_3')") 重置表单
        template(slot="html")
          :markdown-it
            ```html
              <form class="example_3">
                <div class="my-form-group" data-scope="example_3" data-name="sid1" data-type="input"
                v-validate-easy.lazy="[['required','学号为必填项'],['number','学号为全数字构成'],['minLength',[10],'学号最小长度为10位']]">
                  <label>
                    <div class="label">学号1（.lazy修饰符，blur事件才触发验证）</div>
                    <input class="input" type="text" spellcheck="false" placeholder="请输入学号" />
                  </label>
                </div>

                <div class="my-form-group" data-scope="example_3" data-name="sid2" data-type="input"
                v-validate-easy.delay="[['required','学号为必填项'],['number','学号为全数字构成'],['minLength',[10],'学号最小长度为10位']]">
                  <label>
                    <div class="label">学号2（.delay修饰符，输入时每隔500ms触发验证）</div>
                    <input class="input" type="text" spellcheck="false" placeholder="请输入学号" />
                  </label>
                </div>

                <div class="my-form-group" data-scope="example_3" data-name="sid3" data-type="input" data-delay="2000"
                v-validate-easy="[['required','学号为必填项'],['number','学号为全数字构成'],['minLength',[10],'学号最小长度为10位']]">
                  <label>
                    <div class="label">学号3（使用data-delay属性定义触发间隔时间，输入时每隔2s触发验证）</div>
                    <input class="input" type="text" spellcheck="false" placeholder="请输入学号" />
                  </label>
                </div>

                <div class="my-form-group">
                  <label data-scope="example_3" data-name="sid4" data-type="input" v-validate-easy.lazy.delay="[['required','学号为必填项'],['number','学号为全数字构成'],['minLength',[10],'学号最小长度为10位']]">
                    <div class="label">学号4（.lazy.delay同时使用时,只有.lazy生效）</div>
                    <input class="input" type="text" spellcheck="false" placeholder="请输入学号" />
                  </label>
                </div>

                <div class="btn-group">
                  <button class="my-btn" @click.prevent="submit('example_3')">提交表单</button>
                  <button class="my-btn" @click.prevent="reset('example_3')">重置表单</button>
                </div>
              </form>
            ```


      :markdown-it
        ## 3. 其他表单元素写法
        ### 3.1 checkbox radio
      code-tab#example_4(:nav="[{name:'demo'},{name:'html'}]")
        template(slot="demo")
          form.example_4
            div.my-form-group(data-scope="example_4" data-name="sex" data-type="radio"
              v-validate-easy="[['required','性别必须选择一个']]")
              div.label 性别（单选框）
              div
                label.radio
                  input(type="radio" data-name="sex" value="0" )
                  | 男
                label.radio
                  input.radio(type="radio" data-name="sex" value="1" )
                  | 女
            div.my-form-group(data-scope="example_4" data-name="hobby" data-type="checkbox"
              v-validate-easy="[['required','性别必须选择一个']]")
              div.label 爱好（多选框）
              div
                label.checkbox
                  input(type="checkbox" data-name="hobby" value="看书" )
                  | 看书
                label.checkbox
                  input(type="checkbox" data-name="hobby" value="睡觉" )
                  | 睡觉
                label.checkbox
                  input(type="checkbox" data-name="hobby" value="游戏" )
                  | 游戏
                label.checkbox
                  input(type="checkbox" data-name="hobby" value="运动" )
                  | 运动
            div.btn-group
              button.my-btn(@click.prevent="submit('example_4')") 提交表单
              button.my-btn(@click.prevent="reset('example_4')") 重置表单
        template(slot="html")
          :markdown-it
            ```html
              <form class="example_4">
                <div class="my-form-group" data-scope="example_4" data-name="sex" data-type="radio"
                v-validate-easy="[['required','性别必须选择一个']]">
                  <div class="label">性别（单选框）</div>
                  <div>
                    <label class="radio">
                      <input type="radio" data-name="sex" value="0" />男</label>
                    <label class="radio">
                      <input class="radio" type="radio" data-name="sex" value="1" />女</label>
                  </div>
                </div>
                <div class="my-form-group" data-scope="example_4" data-name="hobby" data-type="checkbox"
                v-validate-easy="[['required','性别必须选择一个']]">
                  <div class="label">爱好（多选框）</div>
                  <div>
                    <label class="checkbox">
                      <input type="checkbox" data-name="hobby" value="看书" />看书</label>
                    <label class="checkbox">
                      <input type="checkbox" data-name="hobby" value="睡觉" />睡觉</label>
                    <label class="checkbox">
                      <input type="checkbox" data-name="hobby" value="游戏" />游戏</label>
                    <label class="checkbox">
                      <input type="checkbox" data-name="hobby" value="运动" />运动</label>
                  </div>
                </div>
                <div class="btn-group">
                  <button class="my-btn" @click.prevent="submit('example_4')">提交表单</button>
                  <button class="my-btn" @click.prevent="reset('example_4')">重置表单</button>
                </div>
              </form>

            ```
      :markdown-it
        ### 3.2 select
      code-tab#example_5(:nav="[{name:'demo'},{name:'html'}]")
        template(slot="demo")
          form.example_5
            div.my-form-group(data-scope="example_5" data-name="identity" data-type="select"
              v-validate-easy="[['required','选择一个身份']]")
              div.label 身份（单选列表）
              select
                option 学生
                option 工作

            div.my-form-group(data-scope="example_5" data-name="eat" data-type="select"
              v-validate-easy="[['required','喜欢吃的必须选择一个']]")
              div.label 爱吃的（多选列表）
              select(multiple)
                option 鸡
                option 鸭
                option 鱼
                option 肉

            div.btn-group
              button.my-btn(@click.prevent="submit('example_5')") 提交表单
              button.my-btn(@click.prevent="reset('example_5')") 重置表单
        template(slot="html")
          :markdown-it
            ```html
              <!-- 指令写在select元素，给select元素指定scope，name属性 -->
              <form class="example_5">
                <div class="my-form-group" data-scope="example_5" data-name="identity" data-type="select"
                  v-validate-easy="[['required','选择一个身份']]">
                  <div class="label">身份（单选列表）</div>
                  <select>
                    <option>学生</option>
                    <option>工作</option>
                  </select>
                </div>

                <div class="my-form-group" data-scope="example_5" data-name="eat" data-type="select"
                  v-validate-easy="[['required','喜欢吃的必须选择一个']]">
                  <div class="label">爱吃的（多选列表）</div>
                  <select multiple="multiple">
                    <option>鸡</option>
                    <option>鸭</option>
                    <option>鱼</option>
                    <option>肉</option>
                  </select>
                </div>

                <div class="btn-group">
                  <button class="my-btn" @click.prevent="submit('example_5')">提交表单</button>
                  <button class="my-btn" @click.prevent="reset('example_5')">重置表单</button>
                </div>
              </form>
            ```
      :markdown-it
        ### 3.3 自定义组件
        `在vue组件上添加data-*属性时，会此属性原样渲染到该组件的根元素上`
      code-tab#example_6(:nav="[{name:'demo'},{name:'html'},{name:'myInput',text:'my-input.vue'},{name:'javascript'}]")
        template(slot="demo")
          my-input(label="用户名" data-scope="example_6" data-name="username" v-validate-easy="[['required','用户名不能为空']]" )
          div.btn-group
            button.my-btn(@click.prevent="submit('example_6')") 提交表单
            button.my-btn(@click.prevent="reset('example_6')") 重置表单
        template(slot="html")
          :markdown-it
            ```html
              <!-- 这里data-type属性在my-input.vue中已经指定了 -->
              <my-input label="用户名" data-scope="example_6" data-name="username"
              v-validate-easy="[['required','用户名不能为空']]"></my-input>

              <div class="btn-group">
                  <button class="my-btn" @click.prevent="submit('example_6')">提交表单</button>
                  <button class="my-btn" @click.prevent="reset('example_6')">重置表单</button>
              </div>
            ```
        template(slot="myInput")
          a(href="https://github.com/lfyfly/vue-validate-easy/blob/master/src/components/my-input.vue",target="_blank",style="background:#f6f8fa;padding:0 20px;display:block;") my-input.vue
        template(slot="javascript")
          :markdown-it
            ```js
              // 引用自定义组件
              // 下面例子将使用自定义组件，不再展示引用代码
              import myInput from '@/components/my-input'
              // ...
              components:{
                myInput
              }
            ```

      :markdown-it
        ## 4. 新增验证方法
        ### 4.1 新增验证方法(this.V.$addValidateMethod)
      code-tab#example_7(:nav="[{name:'demo'},{name:'html'},{name:'javascript'}]")
        template(slot="demo")
          form.example_7
            my-input#pwd(label="密码" data-scope="example_7" data-name="pwd" type="password" placeholder="请输入密码" v-validate-easy="[['required','密码不能为空'],['password'],['maxLength',[32],'密码最长为32位']]" )
            my-input(label="确认密码" data-scope="example_7" data-name="repeatpwd" type="password" placeholder="请输入确认密码" v-validate-easy="[['required','确认密码不能为空'],['equalTo',['#pwd'],'密码输入不一致']]")

            div.btn-group
              button.my-btn(@click.prevent="submit('example_7')") 提交表单
              button.my-btn(@click.prevent="reset('example_7')") 重置表单
        template(slot="html")
          :markdown-it
            ```html
              <form class="example_7">
                <my-input id="pwd" label="密码" data-scope="example_7" data-name="pwd" type="password" placeholder="请输入密码"
                  v-validate-easy="[['required','密码不能为空'],['password'],['maxLength',[32],'密码最长为32位']]">
                </my-input>
                <my-input label="确认密码" data-scope="example_7" data-name="repeatpwd" type="password" placeholder="请输入确认密码"
                  v-validate-easy="[['required','确认密码不能为空'],['equalTo',['pwd'],'密码输入不一致']]">
                </my-input>

                <div class="btn-group">
                  <button class="my-btn" @click.prevent="submit('example_7')">提交表单</button>
                  <button class="my-btn" @click.prevent="reset('example_7')">重置表单</button>
                </div>
              </form>
            ```
        template(slot="javascript")
          :markdown-it
            ```js
              beforeCreate() {
                this.V.$addValidateMethod('password', function (val) {
                  var p = /^(\w|[~`!@#$%^&()\[\]:;"'|\?/><.,{}=*\\+-])+$/.test(val)
                  if(!p) return '密码只能由非空格，字母和常用字符组成'
                })

                // 也可传入对象批量新增
                this.V.$addValidateMethod({
                  validator1(){},
                  validator2(){},
                  validator3(){},
                  ....
                })
              }
            ```
        template(slot="myInput")
          a(href="/my-input.vue",target="_blank",style="background:#f6f8fa;padding:0 20px;display:block;") github地址/my-input.vue

      :markdown-it
        ### 4.2 远程校验方法写法
      code-tab#example_8(:nav="[{name:'demo'},{name:'html'},{name:'javascript'}]")
        template(slot="demo")
          form.example_8
            my-input(label="远程校验验证码" data-scope="example_8" data-name="code", v-validate-easy="[['required','验证码不能为空'],['length',['6'],'验证码长度为6位'],['remote_code']]")
            div.btn-group
              button.my-btn(@click.prevent="submit('example_8')") 提交表单
              button.my-btn(@click.prevent="reset('example_8')") 重置表单
        template(slot="html")
          :markdown-it
            ```html
            <form class="example_8">
              <my-input label="远程校验验证码" data-scope="example_8" data-name="code"
              v-validate-easy="[['required','验证码不能为空'],['length',['6'],'验证码长度为6位'],['remote_code']]"></my-input>

              <div class="btn-group">
                <button class="my-btn" @click.prevent="submit('example_7')">提交表单</button>
                <button class="my-btn" @click.prevent="reset('example_7')">重置表单</button>
              </div>
            </form>
        template(slot="javascript")
          :markdown-it
            ```js
              // 因为是异步请求，这里讲验证方法定义成 async 函数
              // async内 await 请求结果
              // return 值为验证错误的提示语，可以由后端响应的错误提示语
              this.V.$addValidateMethod('remote_code', async function (val) {
                console.log('进行远程验证中')
                try {
                  // 这个接口非真实接口，所以会请求错误
                  var { data } = await axios.post('http://localhost:3000/remote', { code: val })
                  console.log('进行远程验证==结束')
                  if (!data.validateResult) return data.message ? data.message : '校验失败'
                } catch (err) {
                  console.log('进行远程验证==错误', err)
                  return '请求错误'
                }
              })
            ```
      :markdown-it
        ### 4.3 Vue.use的时候批量增加验证方法
      code-tab#example_9(:nav="[{name:'demo'},{name:'html'},{name:'validators',text:'validators.js'},{name:'main',text:'main.js'}]")
        template(slot="demo")
          form.example_9
            my-input(label="aaa" data-scope="example_9" data-name="aaa", v-validate-easy="[['required'],['aaa']]")
            my-input(label="bbb" data-scope="example_9" data-name="bbb", v-validate-easy="[['required'],['bbb']]")
            my-input(label="ccc" data-scope="example_9" data-name="ccc", v-validate-easy="[['required'],['ccc']]")

            div.btn-group
              button.my-btn(@click.prevent="submit('example_9')") 提交表单
              button.my-btn(@click.prevent="reset('example_9')") 重置表单
        template(slot="html")
          :markdown-it
            ```html
              <form class="example_9">
                <my-input label="aaa" data-scope="example_9" data-name="aaa" v-validate-easy="[['required'],['aaa']]"></my-input>
                <my-input label="bbb" data-scope="example_9" data-name="bbb" v-validate-easy="[['required'],['bbb']]"></my-input>
                <my-input label="ccc" data-scope="example_9" data-name="ccc" v-validate-easy="[['required'],['ccc']]"></my-input>

                <div class="btn-group">
                  <button class="my-btn" @click.prevent="submit('example_9')">提交表单</button>
                  <button class="my-btn" @click.prevent="reset('example_9')">重置表单</button>
                </div>
              </form>
            ```
        template(slot="validators")
          :markdown-it
            ```js
              export default {
                // 以下方法只是做测试用
                aaa(val) {
                  return val != 'aaa' && '要等于aaa'
                },
                bbb(val) {
                  return val != 'bbb' && '要等于bbb'
                },
                ccc(val) {
                  return val != 'ccc' && '要等于ccc'
                },
              }
            ```
        template(slot="main")
          :markdown-it
            ```js
              import vueValidateEasy from 'vue-validate-easy'
              import validators from './my-validators/validators'
              Vue.use(vueValidateEasy,{validators})
            ```
      :markdown-it
        ### 4.3 内置验证方法
      a(href="https://github.com/lfyfly/vue-validate-easy/blob/master/src/vue-validate-easy/validatorStore.js" target="_blank",style="background:#f6f8fa;padding:0 20px;display:block;") validatorStores.js

      :markdown-it
        ## 5. 调用方法主动验证
      code-tab#example_10(:nav="[{name:'demo'},{name:'html'},{name:'javascript'}]")
        template(slot="demo")
          form#example_10
            h3 用户登录
            my-input#loginUsername(label="用户名" data-scope="login" data-name="username", v-validate-easy="[['required']]")
            my-input(label="密码" data-scope="login" type="password" data-name="pwd", v-validate-easy="[['required']]")
            div.btn-group
              button.my-btn(@click.prevent="validatorAll('login')") 主动验证登录表单
              button.my-btn(@click.prevent="validateLoginUsername") 主动验证 用户名（单字段验证）
              button.my-btn(@click.prevent="resetLoginUsername") 重置用户名表单（单字段重置）
            div.btn-group
              button.my-btn(@click.prevent="submit('login')") 登录
              button.my-btn(@click.prevent="reset('login')") 重置
        template(slot="html")
          :markdown-it
            ```html
              <form id="example_10">
                <h3>用户登录</h3>
                <my-input id="loginUsername" label="用户名" data-scope="login" data-name="username" v-validate-easy="[['required']]"></my-input>
                <my-input label="密码" data-scope="login" type="password" data-name="pwd" v-validate-easy="[['required']]"></my-input>

                <div class="btn-group">
                  <button class="my-btn" @click.prevent="validatorAll('login')">主动验证登录表单</button>
                  <button class="my-btn" @click.prevent="validateLoginUsername">主动验证 用户名(单字段验证)</button>
                  <button class="my-btn" @click.prevent="resetLoginUsername">重置用户名表单（单字段重置）</button>
                </div>
                <div class="btn-group">
                  <button class="my-btn" @click.prevent="submit('login')">提交表单</button>
                  <button class="my-btn" @click.prevent="reset('login')">重置表单</button>
                </div>
              </form>
            ```
        template(slot="javascript")
          :markdown-it
            ```js
              methods:{
                // 主动验证所有scope为register的表单元素
                validatorAll(scope){
                  this.V.$validateAll(scope)
                },
                // 主动验证登录用户名
                // 传入的参数为使用了 v-validate-easy指令的元素
                validateLoginUsername(){
                  this.V.$validateSingle(document.querySelector('#loginUsername'))
                },
                resetLoginUsername() {
                  this.V.$resetSingle(document.querySelector('#loginUsername'))
                },
              }
            ```

      :markdown-it
        ## 6. 自定义错误提示方法
      code-tab#example_11(:nav="[{name:'demo'},{name:'html'},{name:'javascript'}]")
        template(slot="demo")
          form#example_11
            h3 用户注册
            my-input(label="邮箱（alert方式提示错误）" data-error-option="alert" data-scope="register" data-name="email", v-validate-easy.lazy="[['required','邮箱不能为空'],['email']]")
            my-input#register_pwd(label="密码" data-scope="register" type="password" data-name="pwd", v-validate-easy="[['required']]")
            my-input(label="再次输入密码" data-scope="register" type="password" data-name="repeatPwd", v-validate-easy="[['required'],['equalTo',['#register_pwd']]]")
            div.btn-group
              button.my-btn(@click.prevent="submit('register')") 注册
              button.my-btn(@click.prevent="reset('register')") 重置
        template(slot="html")
          :markdown-it
            ```html
              <form id="example_11">
                <h3>用户注册</h3>
                <!-- 首先你要使用this.V.$addErrorOption方法添加一个名为alert错误处理对象  -->
                <!-- 再通过设置data-error-option="alert", email字段采用了alert进行错误提示  -->
                <my-input label="邮箱" data-error-option="alert" data-scope="register" data-name="email"
                  v-validate-easy.lazy="[['required','邮箱不能为空'],['email']]"></my-input>
                <my-input id="register_pwd" label="密码" data-scope="register" type="password" data-name="pwd"
                  v-validate-easy="[['required']]"></my-input>
                <my-input label="再次输入密码" data-scope="register" type="password" data-name="repeatPwd"
                  v-validate-easy="[['required'],['equalTo',['#register_pwd']]]"></my-input>
                <div class="btn-group">
                  <button class="my-btn" @click.prevent="submit('register')">注册</button>
                  <button class="my-btn" @click.prevent="reset('register')">重置</button>
                </div>
              </form>
            ```
        template(slot="javascript")
          :markdown-it
            ```js
              beforeCreate(){
                // 使用了data-error-option="alert"表单元素，当验证错误的时候会，弹出错误信息
                this.V.$addErrorOption('alert', {
                  show(err, directiveEl, errContent) {
                    console.log({err, directiveEl, errContent})
                    if (err) {
                      alert(errContent)
                    }
                  },
                  reset(el) {
                    console.log('data-error-option="alert" reset')
                  }
                })
              }
            ```

      :markdown-it
        ## 7. 自定义表单元素（不借助原生实现）
      code-tab#example_1(:nav="[{name:'demo'},{name:'custom',text:'自定义表单元素'}]")
        template(slot ="demo")
          form
            custom-checks(
              question="这是一个问题？(多选)",
              data-scope="examination",
              data-custom="wahaha",
              data-name="answer",
              :data="[{text:'A.选项1',value:'A'},{text:'B.选项2',value:'B'},{text:'C.选项3',value:'C'},{text:'D.选项4',value:'D'}]",
              v-validate-easy="[['required','请选择你的答案']]"
              )
            div.btn-group
              button.my-btn(@click.prevent="submit('examination')") 提交答案
              button.my-btn(@click.prevent="reset('examination')") 重置
        template(slot ="custom")
          a(href="https://github.com/lfyfly/vue-validate-easy/blob/master/src/components/custom-checks.vue" target="_blank") custom-checks.vue

      :markdown-it
        # Api
        ## 8. options
        ### 8.1 options.validators
        用于批量新增自定义验证方法
        ```js
          import validators from './my-validators/validators'
          var validators ={
            validateMethod1(val){

            },
            validateMethod1(val){

            },
            ....
          }
          Vue.use(vueValidateEasy,{validators})
        ```
        ## 9. 属性
        ### 9.1 scope data-type name delay data-error-option
          `以下属性只能使用在使用了v-validate-easy指令的元素上`

          属性 | 必填 | 属性值 | 描述
          ---|---|---|---
          data-scope | 必填 | 自定义 | 用于标识为同一组表单，作为 $submit 和 $reset 的方法的参数传入
          data-name | 必填 | 自定义 | 表单数据字段键值
          data-type | 可选 |'checkbox' 'radio' 'select' 'input' 'textarea'| 指定表单类型
          data-delay | 可选 | 整数，如'1000' |单位(ms)，当输入框为oninput事件触发的时候，用于限制触发频率
          data-error-option | 可选 | 通过V.$addErrorOption添加的错误处理方法名 | 处理错误的提示，需要手动添加，默认值为 'default'

        ## 10. v-validate-easy指令
        ### 10.1 指令值
        v-validate-easy 的值是一个数组，最多只有三个元素。
        数组中的元素 | 类型 | 必填 | 描述
        ---|--- |--- |---
        第一个数组元素 | String | 必填 | 验证的方法名
        第二个数组元素 | Arrary \| String | 可选 | 为Arrary类型时值的是验证方法的接收参数，String类型时为自定义错误信息
        第三个数组元素 | String | 可选 | 自定义错误信息，只有当第二个元素为Array类型时才生效。

        ### 10.2 指令修饰符
        修饰符 | 作用
        ---|---
        v-validate-easy.delay | 输入框为oninput事件触发的时候，用于限制触发频率,触发间隔500ms。delay属性可自定义该时间。
        v-validate-easy.lazy  | 只会blur事件之后才会触发验证
        **注意**: 如果两个修饰符同时使用（v-validate-easy.lazy.delay），**只有.lazy修饰符起作用**

        ## 11. 方法
        ### V.$submit
        #### 语法
        ```js
          this.V.$submit(scope, (canSumit,data) => {
            //- 对验证结果进行处理
          })
        ```
        #### 参数
        参数 | 必填 | 类型 | 描述
        ---|---|--- |---
        scope | 必填 | String | 同一组表单标识
        callBack | 必填 | function | 对验证结果进行处理
        #### 回调参数
        参数 |  类型 | 描述
        ---|--- |---
        canSumit | Boolean | 为true是，说明当前scope的表单数据全部验证通过
        data | Object | 当前scope表单的数据
        errData | Object | 当前scope表单验证错误的数据,canSumit为true时，errData为null
        ### V.$reset
        重置当前scope的所有表单

        #### 语法
        ```
        this.V.$reset(scope)
        ```
        ### V.$resetSingle
        重置单个表单字段

        #### 语法
        ```
          this.V.$resetSingle(directiveEl)
        ```
        ### V.$validateAll
        主动调用验证当前scope的所有元素

        #### 语法
        ```
          this.V.$validateAll(scope)
        ```
        #### 返回值
        ```
        //  this.V.$validateAll是个async函数，想要取得返回值需用async函数嵌套
        method:{
          async validateAll(scope){
            var { canSumit, data, errData } = await validateAll(scope)
            // 获得的值与 this.V.$submit方法的参数一致
          }
        }
        ```
        ### V.$validateSingle
        主动调用验证当前表单元素的字段

        #### 语法
        ```
          this.V.$validateSingle(directiveEl)
        ```
        #### 返回值
        ```
        // this.V.$validate是个async函数，想要取得返回值需用async函数嵌套
        method:{
          async validate(el){
            var { err,value } = await validate(el)
            // err代表是否验证错误
            // value是该字段的值
          }
        }
        ```
        ### V.$addValidateMethod
        新增验证方法

        #### 语法
        ```
          // 新增一个名为methodName的验证方法
          this.V.$addValidateMethod(methodName, method)
          // 新增多个验证方法
          // validators是一个对象，可以包含多个验证方法
          this.V.$addValidateMethod(validators)
        ```

        #### 实例如下
        ```
          beforeCreate(){
            // this.V.$addValidateMethod(methodName,method)
            this.V.$addValidateMethod('password', function (val) {
              var p = /^(\w|[~`!@#$%^&()\[\]:;"'|\?/><.,{}=*\\+-])+$/.test(val)
              if(!p) return '密码只能由非空格，字母和常用字符'
            })

            // 也可传入对象批量新增
            this.V.$addValidateMethod({
              validator1(){},
              validator2(){},
              validator3(){},
              // ....
            })
          }
        ```
        ### V.$addErrorOption
        ```
          this.V.$addErrorOption('data-error-option-name', {
          show(err, directiveEl, errContent) {
            if (err) {
              console.log(errContent)
            }
          },
          reset() {
            console.log('reset')
          }
        })

        ```
        ### 关于自定义验证方法书写规则
        ```
          // val为当前表单的值
          // len为验证所需参数，是由指令传如值的元素数组中的第二个数组元素
          // v-validate-easy="[['length',[6]]]" ,6是传给length验证方法的的第二个参数（也就是len）
          // 注意参数是个数组类型,要写成['length',[6]], 不能写成['length',6]
          // 返回值是验证不通过时的默认错误提示语
          this.V.$addValidateMethod({
            length (val, len) {
              if (len != val.length) return `长度必须为${len}位`
            }
          })

        ```
</template>

<!-- ——————————————↓JS—————————分界线———————————————————————— -->
<script>

import axios from 'axios'
import myInput from '@/components/my-input'
import codeTab from '@/components/code-tab'
import customChecks from '@/components/custom-checks'

import '@/assets/highlight.pack.js'
import 'highlightjs/styles/xcode.css'
import 'github-markdown-css/github-markdown.css'
var isMobile = navigator.userAgent.match(/(iPhone|iPod|ipad|Android|ios)/i)
export default {
  name: 'app',
  components: {
    myInput,
    codeTab,
    customChecks
  },
  data() {
    return {
      msg: 'this is from app.vue',
      catalogShow:isMobile?false:true,
      isMobile
    }
  },
  methods: {
    clickCatalog(){
      if(!this.isMobile) return
      this.catalogShow = false
    },
    test(test) {
      console.log('test: ' + test)
    },
    validatorAll(scope) {
      this.V.$validateAll(scope)
    },
    validateLoginUsername() {
      this.V.$validateSingle(document.querySelector('#loginUsername'))
    },
    resetLoginUsername() {
      this.V.$resetSingle(document.querySelector('#loginUsername'))
    },
    reset(scope) {
      this.V.$reset(scope)
    },
    submit(scope) {
      this.V.$submit(scope, (canSumit, data, errData) => {
        if (!canSumit) return

        // 只有验证全部通过才会执行
        alert('验证通过,数据如下\n' + JSON.stringify(data))
        axios({
          url: '/test',
          data,
          method: 'post',
        })
          .then(() => {
            // 成功响应处理
          })
          .catch(() => {
            // 错误处理
          })
      })
    },
    // 对markdown生成的标题进行改造
    // 标题selector '#app>h1'
    // level标题等级
    createTitle(selector, level) { //
      var els = document.querySelectorAll(selector)
      for (var i =0; i < els.length; i++){
        var el = els[i]
        var text = el.textContent
        el.id = text
        el.className = 'catalog-title'
        el.innerHTML = `<a class="h${level}" href="#${text}">${text}</a>`
      }

    },
    createCatalog() {
      var catLogEls = document.querySelectorAll('.catalog-title>a')
      var catalogContainerEl = document.querySelector('#catalog')
      catalogContainerEl.innerHTML = catalogContainerEl.innerHTML+'<h2><a href="https://github.com/lfyfly/vue-validate-easy">vue-validate-easy(github)<a/></h2>'
      catalogContainerEl.id = 'catalog'

      for (var  i =0; i <catLogEls.length ; i++){
        var newNode = catLogEls[i].cloneNode(true)
        catalogContainerEl.appendChild(newNode)
      }


    }
  },
  mounted() {
    hljs.initHighlightingOnLoad();

    // 自动生成markdown目录
    this.createTitle('#content>h1', 1)
    this.createTitle('#content>h2', 2)
    this.createTitle('#content>h3', 3)

    this.createCatalog()

  },
  beforeCreate() {

    this.V.$addValidateMethod('remote_code', async function (val) {
      console.log('进行远程验证中')
      try {
        var { data } = await axios.post('http://localhost:3000/remote', { code: val })
        console.log('进行远程验证==结束')
        if (!data.validateResult) return data.message ? data.message : '校验失败'
      } catch (err) {
        console.log('进行远程验证==错误', err)
        return '请求错误'
      }
    })
    this.V.$addValidateMethod('password', function (val) {
      var p = /^(\w|[~`!@#$%^&()\[\]:;"'|\?/><.,{}=*\\+-])+$/.test(val)
      if (!p) return '密码只能由非空格，字母和常用字符'
    })
    // this.V.$addValidateMethod({
    //   password(val) {
    //     var p = /^(\w|[~`!@#$%^&()\[\]:;"'|\?/><.,{}=*\\+-])+$/.test(val)
    //     if (!p) return '密码只能由非空格，字母和常用字符'
    //   }
    // })

    this.V.$addErrorOption('alert', {
      show(err, el, errContent) {
        console.log({ err, el, errContent })
        if (err) {
          alert(errContent)
        }
      },
      reset() {
        console.log('data-error-option="alert" reset')
      }
    })

  }
}
</script>
