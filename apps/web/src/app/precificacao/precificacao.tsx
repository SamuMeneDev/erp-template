import { DescontoGlobalPanel, PrecificacaoPanel } from "@/components/common/precificacao";

export default function Precificacao() {


    return (
        <section className="overflow-y-scroll px-14 p-10 w-full">
            <div className="sm:flex sm:flex-col gap-8 lg:grid lg:grid-cols-12">
                <PrecificacaoPanel />
                <DescontoGlobalPanel />
            </div>
        </section>
    )
}