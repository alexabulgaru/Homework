import java.util.Scanner;

public class IntelRadar {
	public int possiblePoints(int x1, int y1, int r1,
							  int x2, int y2, int r2) {
		if (x1 == x2 && y1 == y2) {
			if (r1 == r2) {
				return -1;
			}

			return 0;
		}

		long deltaX = (long)x2 - x1;
		long deltaY = (long)y2 - y1;
		long distance = deltaX * deltaX + deltaY * deltaY;

		long sumR = (long)r1 + r2;
		long diffR = Math.abs((long)r1 - r2);

		long sumR2  = sumR * sumR;
		long diffR2 = diffR * diffR;

		if (distance > sumR2 || distance < diffR2) {
			return 0;
		}

		if (distance == sumR2 || distance == diffR2) {
			return 1;
		}

		return 2;
	}

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Please provide a value for x1:");
		int x1 = sc.nextInt();
		System.out.println("Please provide a value for y1:");
		int y1 = sc.nextInt();
		System.out.println("Please provide a value for r1:");
		int r1 = sc.nextInt();
		System.out.println("Please provide a value for x2:");
		int x2 = sc.nextInt();
		System.out.println("Please provide a value for y2:");
		int y2 = sc.nextInt();
		System.out.println("Please provide a value for r2:");
		int r2 = sc.nextInt();
		sc.close();

		IntelRadar radar = new IntelRadar();
		int result = radar.possiblePoints(x1, y1, r1, x2, y2, r2);
		System.out.println("Result is: " + result);
	}
}
