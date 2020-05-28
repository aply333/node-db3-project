const db = require('../dbConfig');
module.exports ={
    find,
    findById,
    findSteps,
    add,
    addStep,
    update,
    remove
}

function find(){
    return db('schemes')
}
function findById(id){
    return (
        db('schemes')
            .where({id})
    )
}
function findSteps(id){
    return(
        db('steps')
        .join('schemes', 'steps.scheme_id', '=', 'schemes.id')
        .select('step_number','scheme_name','instructions')
        .where("scheme_id", '=', `${id}`)
        .orderBy('step_number')
    )
}

function add(theScheme){
    return(
        db('schemes')
            .insert(theScheme)
    )
}

function addStep(thePlan, theStep){
    const newStep = {...thePlan, "scheme_id": theStep}
    console.log(newStep)
    return(
        db('steps')
            .insert(newStep)
    )
}

function update(newData, id){
    return(
        db('schemes')
            .where({id})
            .update(newData)
    )
}

function remove(id){
    return(
        db('schemes')
            .where({id})
            .del()
    )
}