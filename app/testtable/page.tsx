import { File, columns } from "@/components/Columns";
import { DataTable } from "@/components/DataTable";

async function getData(): Promise<File[]> {
  // Fetch data from your API here.
  return [
    {
        id: "34234234",
        key: "34234",
        name: "string",
        url: "string",
        createdAt: "string",
        userId: "string",
        uploadStatus:  "SUCCESS" ,
        updatedAt: "string",
    },
    {
        id: "34234234",
        key: "34234",
        name: "string",
        url: "string",
        createdAt: "string",
        userId: "string",
        uploadStatus:  "SUCCESS" ,
        updatedAt: "string",
    },
    
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
