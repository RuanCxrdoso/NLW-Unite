import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react"
import { IconButton } from "./IconButton"
import { Table } from "./Table/Table"
import { TableHeader } from "./Table/TableHeader"
import { TableCell } from "./Table/TableCell"
import { TableRow } from "./Table/TableRow"

export function AttendeeList() {
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="flex items-center gap-3 px-3 py-1.5 w-72 border border-white/10 outline-none rounded-lg text-sm">
          <Search className="size-4 text-emerald-300" />
          <input placeholder="Buscar participante..." className="flex-1 bg-transparent outline-none border-0 p-0 text-sm" />
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              <input type="checkbox" className="size-4 bg-black/20 rounded focus:border-none border-white/10" />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data de check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 8 }).map((_, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <input type="checkbox" className="size-4 bg-black/20 rounded border-white/10" />
                </TableCell>

                <TableCell>
                  13245
                </TableCell>

                <TableCell className="flex flex-col gap-0.5 py-3 px-4 text-sm text-zinc-300">
                  <span className="font-semibold text-white">Ruan Cardoso</span>
                  <span className="text-white/60">cardosoruan2001@gmail.com</span>
                </TableCell>

                <TableCell>
                  7 dias atrás
                </TableCell>

                <TableCell>
                  3 dias atrás
                </TableCell>

                <TableCell>
                  <IconButton transparent >
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </tbody>

        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Mostrando 10 de 229 itens
            </TableCell>

            <TableCell textRight colSpan={3}>
              <div className="items-center gap-8 inline-flex">
                <span>Página 1 de 23</span>

                <div className="flex gap-1.5">
                  <IconButton>
                    <ChevronsLeft className="size-4" />
                  </IconButton>

                  <IconButton>
                    <ChevronLeft className="size-4" />
                  </IconButton>

                  <IconButton>
                    <ChevronRight className="size-4" />
                  </IconButton>

                  <IconButton>
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}
