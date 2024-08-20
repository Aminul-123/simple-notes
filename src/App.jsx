import { useState } from "react"

const initialNote = [
  {
    id: 1,
    title : 'work in Progress',
    desc : 'An application programming interface is a way for two or more computer programs or components to communicate with each other. It is a type of software interface, offering a service to other pieces of software'
  },
  {
    id : 2,
    title : 'what is hooks in react',
    desc : 'Hooks are functions that let you “hook into” React state and lifecycle features from function components. Hooks dont work inside classes — they let you use React without classes.'
  },
  {
    id : 3,
    title : 'Is frontend less stressful?',
    desc : 'Is it stressful to work as a Front End Developer? Front End Developers often face tight deadlines and the pressure to deliver visually appealing and highly functional user interfaces. Balancing creativity with technical precision, they must stay abreast of rapidly evolving technologies and browser updates.'
  },
  {
    id : 4,
    title : 'Is frontend easier than backend?',
    desc : ' Front-end is considered technically easy as compared to the backend because the backend requires more solid skills such as strong command over programming languages, DSA, data management skills, etc. whereas the front end requires designing skills along with programming language'
  }
]
export default function App () {
  
  const [res, setRes] = useState(initialNote);

  function handleNewNotes (notes) {
    setRes((prevNotes) => [...prevNotes, notes]);
  }
  function handleDelete (id) {
    setRes((prev) => prev.filter((prevNote) => prevNote.id !== id ))
  }
  return (
    <>
    <div className="cont">
        <CreateNote
       
        handleNewNotes={handleNewNotes}
        />
        <Notes res={res} handleDelete={handleDelete} />
    </div>
    </>
  )
}
function CreateNote ({ handleNewNotes}) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('')
 
  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !desc) return ;
   
    const newNotes = {
      title,
      desc,
      id:  crypto.randomUUID()
    }
    console.log(newNotes)
    handleNewNotes(newNotes);

    setTitle('')
    setDesc('')
  }



  return (
    <>
    <div className="create">
      <h2>Create Notes</h2>
      <form onSubmit={handleSubmit}>
        <div className="titleCont">
          <input type="text" id="title" placeholder="Title" className="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="descCont">
          <textarea type="text" id="desc" placeholder="description" className="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
           />
        </div>
        <button className="createBtn">Create</button>
      </form>
    </div>
    </>
  )
}

function Notes ({res , handleDelete}) {
  return (
    <>
    <div className="notes">
      {
        res.map((notes) => {
          return (
            <SingleNote  notes={notes}  key={notes.id}
            handleDelete={handleDelete}
            />
          )
        })
      }
    </div>
    </>
  )
}
function SingleNote ({notes, handleDelete}) {
  const [showDetails , setShowDetails] = useState(true)
  return (
    <>
    <div className="singleNote" onClick={() => setShowDetails((show) => !show)} >
      {
        showDetails ? (
          <>
        <h3 className="singleTitle">
          {notes.title}
        </h3>
        <button className="del" onClick={() => handleDelete (notes.id)}>Delete</button>
          </>


        )  : (
          <div >
                    <h3>
                       {notes.title}
                    </h3>
                    <p> {notes.desc} </p>
          </div>
        )
      }
    </div>
    </>
  )
}