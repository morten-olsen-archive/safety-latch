interface PackageScanResult {
  pkgPath: string;
  name: string;
  scripts: string[];
}

interface ScanResult {
  allowed: PackageScanResult[];
  disallowed: PackageScanResult[];
  unknown: PackageScanResult[];
  all: PackageScanResult[];
}

export type { PackageScanResult, ScanResult };
