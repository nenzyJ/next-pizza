import { getUserSession } from "@/lib/get-user-session";
import { redirect } from "next/navigation";
import { prisma } from "../../../../prisma/prisma";
import { ProfileForm } from "@/components/shared/ProfileForm";

export default async function ProfilePage(){

    const session = await getUserSession();

    if(!session){
        return redirect('/api/auth/signin')
    }

    const user = await prisma.user.findFirst({where: {id: Number(session?.id)}})

    if(!user){
        return redirect('/')
    }

    return <ProfileForm data={user}/>
}