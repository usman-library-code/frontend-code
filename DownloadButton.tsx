import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DownloadButton() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/download/power-pack-source.tar.gz';
    link.download = 'power-pack-code-library.tar.gz';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      onClick={handleDownload}
      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
    >
      <Download size={16} className="mr-2" />
      Download Source Code
    </Button>
  );
}