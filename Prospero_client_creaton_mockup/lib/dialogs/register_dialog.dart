import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:printing/printing.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:universal_html/html.dart' as html; // only “lives” on web

import '../components/gradient_button.dart';
import '../components/step_indicators.dart';
import '../components/styled_text_field.dart';

class RegisterWizardDialog extends StatefulWidget {
  const RegisterWizardDialog({super.key});

  @override
  State<RegisterWizardDialog> createState() => _RegisterWizardDialogState();
}

class _RegisterWizardDialogState extends State<RegisterWizardDialog> {
  int _page = 0;

  // ────────────────────────── Form controllers ──────────────────────────
  bool _hasFamilyCard = false;
  final _nameCtrl = TextEditingController();
  final _dobCtrl = TextEditingController();
  final _natIdCtrl = TextEditingController();
  final _famCardCtrl = TextEditingController();
  final _phoneNrCtrl = TextEditingController();
  final _emailCtrl = TextEditingController();
  final _incomeCtrl = TextEditingController();
  final _empCtrl = TextEditingController();
  final int registrationNumber = 483584;

  // ───────────────────────────────── Widget tree ─────────────────────────────────
  @override
  Widget build(BuildContext context) {
    final pages = <Widget>[
      _eligibilityPage(),
      _personalInfoPage(),
      _documentsPage(),
      _contactPage(),
      _incomePage(),
      _finishPage(),
    ];
    final pageTitles = [
      'Eligibility',
      'Personal info',
      'Documents',
      'Contact',
      'Income & employment',
      'Customer created'
    ];

    return Dialog(
      insetPadding: const EdgeInsets.all(32),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      backgroundColor: Colors.white,
      child: SizedBox(
        width: 700,
        height: 600,
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.only(
                top: 32,
                bottom: 32,
                left: 48,
                right: 48,
              ),
              child: Row(
                children: [
                  _header(pageTitles[_page]),
                  const Expanded(child: Spacer()),
                  StepIndicators(current: _page, total: 6),
                ],
              ),
            ),
            const Divider(
              height: 1,
              color: Color.fromRGBO(229, 231, 235, 0.8),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 32),
                child: pages[_page],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(32),
              child: Row(
                children: [
                  if (_page > 0)
                    TextButton(onPressed: _prev, child: const Text('Back')),
                  const Spacer(),
                  GradientButton(
                    text: _page == 5 ? 'Finish' : 'Next',
                    onTap: _next,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  // ────────────────────────────── PDF helpers ─────────────────────────────
  Future<pw.Document> _buildPdf() async {
    final doc = pw.Document();
    final bold = pw.TextStyle(fontSize: 14, fontWeight: pw.FontWeight.bold);

    doc.addPage(
      pw.Page(
        pageFormat: PdfPageFormat.a4,
        build: (context) => pw.Column(
          crossAxisAlignment: pw.CrossAxisAlignment.start,
          children: [
            pw.Text(
              'Client registration #$registrationNumber',
              style: pw.TextStyle(fontSize: 20, fontWeight: pw.FontWeight.bold),
            ),
            pw.SizedBox(height: 16),
            _section(
                'Eligibility',
                [
                  _line('Has family card', _hasFamilyCard ? 'Yes' : 'No'),
                ],
                bold),
            _section(
                'Personal info',
                [
                  _line('Full name', _nameCtrl.text),
                  _line('Date of birth', _dobCtrl.text),
                ],
                bold),
            _section(
                'Documents',
                [
                  _line('National ID', _natIdCtrl.text),
                  _line('Family Card ID', _famCardCtrl.text),
                ],
                bold),
            _section(
                'Contact',
                [
                  _line('Phone', _phoneNrCtrl.text),
                  _line('Email', _emailCtrl.text),
                ],
                bold),
            _section(
                'Income & employment',
                [
                  _line('Monthly income', _incomeCtrl.text),
                  _line('Employer / Position', _empCtrl.text),
                ],
                bold),
            pw.Spacer(),
            pw.Text(
              'Generated on '
              '${DateFormat.yMMMd().add_jm().format(DateTime.now())}',
              style: pw.TextStyle(fontSize: 10, color: PdfColors.grey600),
            ),
          ],
        ),
      ),
    );
    return doc;
  }

  pw.Widget _section(String title, List<pw.Widget> lines, pw.TextStyle bold) =>
      pw.Column(
        crossAxisAlignment: pw.CrossAxisAlignment.start,
        children: [
          pw.Text(title, style: bold),
          pw.SizedBox(height: 4),
          ...lines,
          pw.SizedBox(height: 12),
        ],
      );

  pw.Widget _line(String label, String value) => pw.Row(
        children: [
          pw.Expanded(flex: 3, child: pw.Text(label)),
          pw.Expanded(
              flex: 5, child: pw.Text(value, textAlign: pw.TextAlign.right)),
        ],
      );

  Future<void> _downloadPdf() async {
    final pdf = await _buildPdf();
    final bytes = await pdf.save();

    if (kIsWeb) {
      // ───── Web: trigger a real download without any plugins ─────
      final blob = html.Blob([bytes], 'application/pdf');
      final url = html.Url.createObjectUrlFromBlob(blob);

      html.AnchorElement(href: url)
        ..setAttribute('download', 'client_$registrationNumber.pdf')
        ..click(); // <a download> trick

      html.Url.revokeObjectUrl(url);
    } else {
      // ───── Mobile / desktop: native share sheet from `printing` ─────
      await Printing.sharePdf(
        bytes: bytes,
        filename: 'client_$registrationNumber.pdf',
      );
    }
  }

  // ────────────────────────────── Wizard pages ─────────────────────────────
  Widget _eligibilityPage() => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 32),
          SwitchListTile(
            title: const Text('Do you have a family card?'),
            value: _hasFamilyCard,
            onChanged: (v) => setState(() => _hasFamilyCard = v),
          ),
        ],
      );

  Widget _personalInfoPage() => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 32),
          StyledTextField(controller: _nameCtrl, label: 'Full name'),
          const SizedBox(height: 24),
          StyledTextField(controller: _dobCtrl, label: 'Date of birth'),
        ],
      );

  Widget _documentsPage() => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 32),
          StyledTextField(controller: _natIdCtrl, label: 'National ID'),
          const SizedBox(height: 24),
          StyledTextField(controller: _famCardCtrl, label: 'Family Card ID'),
          const SizedBox(height: 24),
          OutlinedButton.icon(
            icon: const Icon(Icons.upload_file),
            label: const Text('Upload ID Scan'),
            onPressed: () {},
          ),
          const SizedBox(height: 12),
          OutlinedButton.icon(
            icon: const Icon(Icons.upload_file),
            label: const Text('Upload Family Card Scan'),
            onPressed: () {},
          ),
          const SizedBox(height: 12),
          OutlinedButton.icon(
            icon: const Icon(Icons.photo_camera),
            label: const Text('Take photo'),
            onPressed: () {},
          ),
        ],
      );

  Widget _contactPage() => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 32),
          StyledTextField(controller: _phoneNrCtrl, label: 'Phone Nr.'),
          const SizedBox(height: 24),
          StyledTextField(controller: _emailCtrl, label: 'Email'),
        ],
      );

  Widget _incomePage() => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 32),
          StyledTextField(
            controller: _incomeCtrl,
            label: 'Monthly income',
            keyboardType: TextInputType.number,
          ),
          const SizedBox(height: 24),
          StyledTextField(controller: _empCtrl, label: 'Employer / Position'),
        ],
      );

  Widget _finishPage() => Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const SizedBox(height: 64),
          const Icon(Icons.add_task_sharp, color: Colors.green, size: 128),
          const SizedBox(height: 12),
          Text(
            'Client successfully created',
            style: Theme.of(context)
                .textTheme
                .headlineMedium
                ?.copyWith(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          Text(
            'Client registration number: $registrationNumber',
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  fontWeight: FontWeight.w500,
                  fontSize: 15,
                ),
          ),
          const Spacer(),
          GradientButton(
            text: 'Download registration PDF',
            onTap: _downloadPdf,
          ),
        ],
      );

  // ────────────────────────────── Helpers ─────────────────────────────
  Widget _header(String title) => Text(
        title,
        style: Theme.of(context).textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.bold,
              color: const Color(0xFF094B9C),
            ),
      );

  void _next() {
    if (_page == 5) {
      Navigator.pop(context); // Submit / save later
    } else {
      setState(() => _page += 1);
    }
  }

  void _prev() {
    if (_page > 0) setState(() => _page -= 1);
  }
}
