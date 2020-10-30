import { app, Component } from 'apprun';

export default class HomeComponent extends Component {
  state = {
    tasks: [],
    value: ''
  }

  update = {
    'addTask': async (state, event) => {
      event.preventDefault();
      const data = new FormData(event.target);
      const task = {
          id: state.tasks.length + 1,
          text: data.get('text'),
          status: 0
      }
      state.tasks.push(task)
      
      return state;
    },
    'delete': async (state, id) => {
      console.log(id, state.tasks);
      const loc = state.tasks.findIndex(task => task.id == id)
      state.tasks.splice(loc, 1);
      
      return state;
    },
    'done': (state, id) => {
      const task = state.tasks.find(task => task.id == id);
      task.status = 1;
      return state
    },
    'onDragStart': (state, event) => {
      console.log('MOOOO', state, event);
      event.dataTransfer.setData('text', event.target.id)
      return state
    },
    'onDrop': (state, event) => {
        event.preventDefault();
        console.log('MOOOOOO DROP', state);
        const id = event.dataTransfer.getData('text')
        const index = state.tasks.findIndex(task => task.id == id)
        state.tasks.splice(index, 1)
        return state
    }
  }

  view = (state) => <div class="main">
    <section class="full done" ondragover="event.preventDefault()" ondrop={e => this.run('onDrop', e)}>
      <h2>Done</h2>
    </section>

    <section>
      <h2>Tasks</h2>

      <form onsubmit={e => this.run('addTask', e)}>
          <input name="text" type="text" value={state.value} placeholder="Add a task" required/>
          <button>Add</button>
      </form>

      <ul>
          {state.tasks.map(task => 
          {
            if(task.status == 1) {
              return <li id={task.id} class="done" draggable="true" ondragstart={e => this.run('onDragStart', e)}> 
                {task.text} 
                <button onclick={e => this.run('delete', task.id)}>Delete</button>
                </li>
            }
            return <li draggable="true" ondragstart={e => this.run('onDragStart', e)}>{task.text} 
                <button onclick={e => this.run('done', task.id)}>Done</button>
              </li>
          })}
      </ul>
    </section>

    <section class="full delete" ondragover="event.preventDefault()" ondrop={e => this.run('onDrop', e)}>
      <h2>Delete</h2>
    </section>
    </div>;
  
}

