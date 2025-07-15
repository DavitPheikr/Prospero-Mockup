
import 'package:flutter/material.dart';

class StepIndicators extends StatelessWidget {
  const StepIndicators({
    super.key,
    required this.current,
    required this.total,
  });

  final int current; // zero-based
  final int total;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: List.generate(
        total,
        (i) => Padding(
          padding: const EdgeInsets.only(left: 8.0),
          child: _Dot(number: i + 1, isActive: i == current),
        ),
      ),
    );
  }
}

class _Dot extends StatelessWidget {
  const _Dot({required this.number, required this.isActive});
  final int number;
  final bool isActive;

  @override
  Widget build(BuildContext context) {
    if (isActive) {
      return Container(
        width: 40,
        height: 40,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF094B9C), Color(0xFF0369A1)],
          ),
          boxShadow: const [
            BoxShadow(
              offset: Offset(0, 4),
              blurRadius: 12,
              color: Color.fromRGBO(9, 75, 156, 0.3),
            ),
          ],
        ),
        child: Center(
          child: Text(
            number.toString(),
            style: Theme.of(context).textTheme.labelLarge?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w700,
                ),
          ),
        ),
      );
    } else {
      return Container(
        width: 40,
        height: 40,
        decoration: BoxDecoration(
          color: const Color(0xFFB0B2B8),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Center(
          child: Text(
            number.toString(),
            style: Theme.of(context).textTheme.labelLarge?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w700,
                ),
          ),
        ),
      );
    }
  }
}
