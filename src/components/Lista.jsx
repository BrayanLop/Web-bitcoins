function Lista({ idLista, items }){
    return(
        <>
            <ul id={idLista}>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </>
    )
}

export { Lista }