import { Badge } from "lucide-react";

<div className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all">
  <div className="flex w-full flex-col gap-1">
    <div className="flex items-center">
      <div className="flex items-center gap-2">
        <div className="font-semibold">123</div>
        <span className="flex h-2 w-2 rounded-full bg-blue-600" />

      </div>
      <div className="ml-auto text-xs">
        456
      </div>
    </div>
    <div className="text-xs font-medium">789</div>
  </div>
  <div className="line-clamp-2 text-xs text-muted-foreground">
    120
  </div>
  <div className="flex items-center gap-2">
    <Badge>
      456
    </Badge>
  </div>

</div>