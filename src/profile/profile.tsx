export default function Profile({
    name, 
    semestre, 
    programa, 
    perfil
}: { 
    name: string; 
    semestre: string; 
    programa: string; 
    perfil: string;
}) {
    return (
        <div>
            <h1 className="text-[#ffffff]"> 
        {name}, 
        </h1> 
        <h1 className="text-[#ffffff]"> 
        {semestre},
        </h1> 
        <h1 className="text-[#ffffff]"> 
        {programa} 
        </h1> 
        <h1 className="text-[#ffffff]"> 
        {perfil} 
        </h1> 
        </div>
        

    )
}