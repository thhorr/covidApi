import Covid from "./Covid";

export const Show = ({all, state, district}) => {








    if(state) {
        return (
            <div>
                Something
            </div>
        )
    }
    if(district) {
        return (
            <div>
                Nothing
            </div>
        )
    }
    return(
        <div>Check</div>
    )
}