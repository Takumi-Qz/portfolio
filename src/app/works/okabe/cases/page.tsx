import type { Metadata } from "next";
import { CaseList } from "@/components/okabe/CaseList";
import { PageHead } from "@/components/okabe/PageHead";

export const metadata: Metadata = { title: "加工実績" };

export default function Cases() {
  return (
    <>
      <PageHead
        no="02"
        crumb="加工実績"
        title="一個の試作から、量産まで。"
        lead="お客さまの許可をいただいたものだけを、材質・公差・数量・納期とあわせて載せています。似た部品のご相談があれば、そのときの削り方をもとにお見積りします。"
      />
      <section className="mx-auto max-w-[1360px] px-5 py-16 md:px-10 md:py-24">
        <CaseList />
      </section>
    </>
  );
}
